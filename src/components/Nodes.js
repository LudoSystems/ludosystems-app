import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { 
    removeElements, 
    addEdge, 
    MiniMap, 
    Controls,
    Background,
} from 'react-flow-renderer';

import { Redirect } from "react-router-dom";
import axios from "axios";

import NodeService from "../services/NodeService";
import AuthService from "../services/AuthService";

import LudoNode from './LudoNode';
import '../styles/LudoNode.scss';

import { ReactComponent as AddNodeButton } from '../svg/button-add-node.svg';

const snapGrid = [10,10];

const nodeTypes = {
    ludoNode: LudoNode,
};

const Nodes = () => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    const [elements, setElements] = useState([]);
    const [warning, setWarning] = useState("");

    const handleError = (error) => {
        // if(error.response && error.response.status === 401) {
            // I'm not entirely convinced if this is a good way to do this.
    
            // TODO check if this is a good way to do this.
        
        
            // AuthService.logout();
            // setCurrentUser(null);
        // } else {
            const _warning =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.toString();

            setWarning(_warning);
        // }
    };
    
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
    }, []);

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
        )
    };

    const onNodeDragStop = (event, node) => {
        NodeService.updateNodePosition(node.id, node.position.x, node.position.y).then(
            (response) => {
                // Nothing needs to happen
            },
            (error) => handleError(error)
        )
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
    
    useEffect(() => {
        NodeService.getRoots().then(
            (response) => {
                const _elements = [];

                const createFlowElements = (node, elements, edges) => {

                    elements.push(createNode({
                        id: node.id,
                        posX: node.posX,
                        posY: node.posY,
                        attributes: node.attributes,
    
                    }));

                    for(const child of node.children) {
                        let childId;

                        if(isNaN(child)){
                            createFlowElements(child, elements, edges);
                            
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
                };

                if(response.data._embedded) {
                    for (const node of response.data._embedded.nodes) {
                        const edges = [];
    
                        createFlowElements(node, _elements, edges);
    
                        _elements.push(...edges);
                    }
                }
               
                setElements(_elements);
            },
            (error) => handleError(error)
        );
    }, [createNode]);

    return ( 
        <>
            {currentUser ? (              
                    <div id="node-editor" >
                    <div id="node-editor-controls">
                        <button 
                            id="node-add-button" 
                            className="node-editor-control" 
                            onClick={onAddClick}>
                                <AddNodeButton />
                        </button>
                    </div>
                        {warning && (
                            <div className="warning">
                                {warning}
                            </div>
                        )}
                      
                        <ReactFlow
                            elements={elements}
                            onElementsRemove={onElementsRemove}
                            onConnect={onConnect}
                            onNodeDragStop={onNodeDragStop}
                            snapToGrid={true}
                            snapGrid={snapGrid}
                            nodeTypes={nodeTypes}
                            deleteKeyCode={46}
                            minZoom={0.1}
                            arrowHeadColor="black"
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
            ) : (
                <Redirect to='/login' />
            )}
        </>
    );
};

export default Nodes;