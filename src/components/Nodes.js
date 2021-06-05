import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { 
    removeElements, 
    addEdge, 
    MiniMap, 
    Controls,
    Background,
    // useStoreState - see comment in onNodeDragStop
} from 'react-flow-renderer';

import { useHistory } from "react-router-dom";
import axios from "axios";

import NodeService from "../services/NodeService";

import { useCurrentUser } from "./CurrentUserContext";

import LudoNode from './LudoNode';
import '../styles/LudoNode.scss';

import { ReactComponent as AddNodeButton } from '../svg/button-add-node.svg';
import { ReactComponent as ExportJsonButton } from '../svg/button-export-json.svg';

const snapGrid = [10,10];

const nodeTypes = {
    ludoNode: LudoNode,
};

const Nodes = () => {
    const [elements, setElements] = useState([]);
    const [warning, setWarning] = useState("");

    // const selectedElements = useStoreState(actions => actions.selectedElements); - see comment in onNodeDragStop

    const { logout } = useCurrentUser();
    
    const history = useHistory();

    const handleError = useCallback((error) => {
        if(error.response && error.response.status === 401) {
            logout();
            history.push("/login");
        } else {
            const _warning =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.toString();

            setWarning(_warning);
        }
    }, [history, logout]);
    
    const createNode = useCallback((props) => {
        return {
            id: '' + props.id,
            data: { 
                label: 'Node ' + props.id,
                nodeId: props.id,
                attributes: props.attributes,
                handleError: e => { handleError(e) },
             },
            type: 'ludoNode',
            position: { x: props.posX, y: props.posY }
        }
    }, [handleError]);

    const onElementsRemove = (elementsToRemove) => {
        const nodes = elementsToRemove.filter(element => !element.source);
        const edges = elementsToRemove.filter(element => element.source);

        const requests = [];

        for(const edge of edges) {
            requests.push(NodeService.disconnectNodes(edge.source, edge.target));
        }

        for(const node of nodes) {
            requests.push(NodeService.deleteNode(node.id));
        }

        axios.all(requests).then(
            axios.spread((...responses) => {
                setElements((els) => removeElements(elementsToRemove, els));
              })).catch(errors => {
                handleError(errors)
            }
        );
    };

    const onPositionUpdate = useCallback((nodes) => {
        const requests = [];
    
        for(const node of nodes) {
            requests.push(NodeService.updateNodePosition(node.id, node.position.x, node.position.y));
        }
    
        axios.all(requests).then(
            axios.spread((...responses) => {
                    // Nothing needs to happen.
                })).catch(errors => {
                    handleError(errors)
                }
        );

    }, [handleError]);

    const onNodeDragStart = (event, node) => {
        event.preventDefault();
    }

    const onSelectionDragStop = (event, nodes) => {
        onPositionUpdate(nodes);
    }

    const onNodeDragStop = (event, node) => {
        const nodesToUpdate = [];

        // TODO Haven't been able to find a way to make this work for mulitple nodes as 
        // selectedElements do not update their position after initializing. Asking
        // the react-flow community and will then update this.

        // if(selectedElements && selectedElements.length > 0) {
        //     nodesToUpdate.push(...selectedElements);
        // } else {
        nodesToUpdate.push(node);
        // }

        // if(selectedElements && selectedElements.length > 0) {
        //     console.log("Drag Start");
        //     for(const selectedElement of selectedElements) {
        //         console.log(selectedElement.id + " [" + selectedElement.position.x + ", " + selectedElement.position.y + "]")
        //     }
        // }
        
        onPositionUpdate(nodesToUpdate);
    };

    const onConnect = (params) => {
        NodeService.connectNodes(params.source, params.target).then(
            (response) => {
                params.arrowHeadType = 'arrowclosed';
                setElements((els) => addEdge(params, els));
            },
            (error) => handleError(error)
        )
    };

    const onAddClick = () => {
        NodeService.addNode({
            posX: Math.floor((window.innerWidth / 2 - Math.random() * 100) / 10) * 10,
            posY: Math.floor((window.innerHeight / 2 - Math.random() * 100) / 10) * 10
        }).then(
            (response) => {
                const newElement = createNode({
                    id: response.data.id,
                    posX: response.data.posX,
                    posY: response.data.posY,

                });

                setElements((els) => els.concat(newElement));
            },
            (error) => handleError(error)
        );
    };

    const onExportJsonClick = () => {
        NodeService.exportJson().then(
            (response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                
                const link = document.createElement('a');

                // TODO this... seems bad and needs to be looked at further.
                link.href = url;
                link.setAttribute('download', 'ludo-nodes.json');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
            (error) => handleError(error)
        );
    };
    
    useEffect(() => {
        NodeService.getNodes().then(
            (response) => {
                const elements = [];
                const edges = [];
                
                if(response.data._embedded) {
                    for (const node of response.data._embedded.nodes) {

                        elements.push(createNode({
                            id: node.id,
                            posX: node.posX,
                            posY: node.posY,
                            attributes: node.attributes,
        
                        }));

                        for(const child of node.children) {
                            let childId;
    
                            if(isNaN(child)){
                                childId = child.id;
                            } else {
                                childId = child;
                            }
                            
                            edges.push({
                                id: 'e' + node.id + '-' + childId,
                                source: '' + node.id,
                                target: '' + childId,
                                arrowHeadType: 'arrowclosed',
                            });
                        }
                    }
                }
                
                elements.push(...edges);
                
                setElements(elements);
            },
            (error) => handleError(error)
        );
    }, [createNode, handleError]);

    return ( 
        <>
            <div id="node-editor" >
            <div id="node-editor-controls">
                <button 
                    title="Add Node"
                    id="node-add-button" 
                    className="node-editor-control" 
                    onClick={onAddClick}>
                        <AddNodeButton />
                </button>
                <button
                    title="Export JSON"
                    id="export-json-button"
                    className="node-editor-control"
                    onClick={onExportJsonClick}>
                        <ExportJsonButton />
                </button>
            </div>
                {warning && (
                    <div className="warning">
                        <h3>Something went very wrong.</h3>
                        <div>
                            {warning}
                        </div>
                        <div>
                            Your last few changes may not have saved. Try refreshing, or contact the site owner.
                        </div>
                    </div>
                )}
                <ReactFlow
                    elements={elements}
                    onElementsRemove={onElementsRemove}
                    onConnect={onConnect}
                    onNodeDragStart={onNodeDragStart}
                    onNodeDragStop={onNodeDragStop}
                    onSelectionDragStop={onSelectionDragStop}
                    snapToGrid={true}
                    snapGrid={snapGrid}
                    nodeTypes={nodeTypes}
                    deleteKeyCode={46}
                    minZoom={0.1}
                    arrowHeadColor="black"
                    selectNodesOnDrag={false}
                >
                    <Background
                        variant="dots"
                        gap={10}
                        size={0.5}
                    />
                    <MiniMap
                        nodeColor="white"
                        nodeStrokeWidth={3}
                    />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    );
};

export default Nodes;