import React, { useState, useEffect, useCallback } from "react";
import ReactFlow, { 
    removeElements, 
    addEdge, 
    MiniMap, 
    Controls 
} from 'react-flow-renderer';
import { Redirect } from "react-router-dom";

import NodeService from "../services/NodeService";
import AuthService from "../services/AuthService";

const snapGrid = [10,10];

const Nodes = () => {
    const currentUser = AuthService.getCurrentUser();

    const [elements, setElements] = useState([]);
    const [warning, setWarning] = useState("");

    const setError = (error) => {
        const _warning =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.toString();
        
        setWarning(_warning);
    }

    const onElementsRemove = (elementsToRemove) => {
        NodeService.deleteNode(elementsToRemove[0].id).then(
            (response) => {
                setElements((els) => removeElements(elementsToRemove, els));
            },
            (error) => setError(error)
        );
    };

    const onNodeDragStop = (event, node) => {
        NodeService.updateNodePosition(node.id, node.position.x, node.position.y).then(
            (response) => {
                // Nothing needs to happen
            },
            (error) => setError(error)
        )
    }

    const onConnect = (params) => 
        setElements((els) => addEdge(params, els));

    const onAdd = useCallback(() => {
        NodeService.addNode({
            posX: window.innerWidth / 2 - Math.floor(Math.random() * 10) * 10,
            posY: window.innerHeight / 2 - Math.floor(Math.random() * 10) * 10
        }).then(
            (response) => {
                const newElement = {
                    id: '' + response.data.id,
                    data: { label: 'Node ' + response.data.id },
                    position: { x: response.data.posX, y: response.data.posY }
                }

                setElements((els) => els.concat(newElement));
            },
            (error) => setError(error)
        );
    }, [setElements]);
    
    useEffect(() => {
        NodeService.getRoots().then(
            (response) => {
                const _elements = [];

                const createFlowElements = (node, elements, edges) => {
                    const element = {
                        id: '' + node.id,
                        data: { label: 'Node ' + node.id },
                        position: { x: node.posX, y: node.posY }
                    };

                    elements.push(element);

                    for(const child of node.children) {
                        let childId;

                        if(isNaN(child)){
                            createFlowElements(child, elements, edges);
                            
                            childId = child.id;
                        } else {
                            childId = child;
                        }
                        
                        const edge = {
                            id: 'e' + node.id + '-' + childId,
                            source: '' + node.id,
                            target: '' + childId,
                            arrowHeadType: 'arrowclosed',
                        }
                        edges.push(edge);
                    }
                };

                for (const node of response.data._embedded.nodes) {
                    const edges = [];

                    createFlowElements(node, _elements, edges);

                    _elements.push(...edges);
                }

                setElements(_elements);
            },
            (error) => setError(error)
        );
    }, []);

    return ( 
        <>
            {currentUser ? (              
                    <div id="node-editor" >
                    <div id="node-editor-controls">
                        <button className="node-editor-control" onClick={onAdd}>+</button>
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

                            deleteKeyCode={46}
                           
                        >
                             <MiniMap
                                nodeColor={(node) => {
                                    switch (node.type) {
                                    case 'input':
                                        return 'red';
                                    case 'default':
                                        return '#77C7E9';
                                    case 'output':
                                        return 'rgb(0,0,255)';
                                    default:
                                        return '#eee';
                                    }
                                }}
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