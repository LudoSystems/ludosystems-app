import React, { memo, useState} from "react";

import { Handle, useStoreActions } from "react-flow-renderer";

import AttributeService from "../services/AttributeService";

import TextAttribute from "./TextAttribute";
import NumberAttribute from "./NumberAttribute";

import { ReactComponent as AddTextButton } from "../svg/button-add-text.svg";
import { ReactComponent as AddNumberButton } from "../svg/button-add-number.svg";
import { ReactComponent as AddListButton } from "../svg/button-add-list.svg";
import { ReactComponent as MoveButton } from "../svg/button-move.svg";
import { ReactComponent as EditButton } from "../svg/button-edit.svg";

const LudoNode = memo(({ data }) => {
    const [attributes, setAttributes] = useState(data.attributes);
    const [editing, setEditing] = useState(false);

    const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

    const onAddTextClick = (e) => {
        AttributeService.createTextAttribute(data.nodeId).then(
            (response) => {
                setAttributes([...attributes, response.data]);
            },
            (error) => data.handleError(error)
        );
    };

    const onAddNumberClick = (e) => {
        AttributeService.createNumberAttribute(data.nodeId).then(
            (response) => {
                setAttributes([...attributes, response.data]);
            },
            (error) => data.handleError(error)
        );
    };

    const deleteAttribute = (id) => {
        setAttributes(attributes.filter(attribute => attribute.id !== id));
    };

    const onEditClick = () => {
        setEditing(true);
        
        // Deselect selected elements to prevent accidental node deletion
        setSelectedElements([]);
    };

    const onMoveClick = () => setEditing(false);

    return (
        <div
            className={"ludo-node" + (editing ? " editing nodrag" : "")}
        >
            <Handle
                type="target"
                position="top"
            />
            <div className="button-panel node">
                {editing ? (
                    <button
                        title="Stop Editing"
                        className="node-attribute-button move-node"
                        onClick={onMoveClick}>
                            <MoveButton/>
                    </button>
                ) : (
                    <button
                        title="Edit Node"
                        className="nodrag node-attribute-button edit-node"
                        onClick={onEditClick}>
                            <EditButton/>
                    </button>
                )}
            </div>
            <div 
                className={"node-attributes" + (editing ? " editing" : "")}
            >
                {attributes && attributes.length > 0 ? 
                    (attributes.map(attribute => {
                        if(attribute.type === "TEXT") {
                            return <TextAttribute 
                                        key={data.nodeId + '_' + attribute.id} 
                                        attributeId={attribute.id}
                                        name={attribute.name} 
                                        text={attribute.text}
                                        handleError={data.handleError}
                                        deleteAttribute={deleteAttribute}
                                    />
                        } else if (attribute.type === "NUMBER") {
                            return <NumberAttribute 
                                        key={data.nodeId + '_' + attribute.id} 
                                        attributeId={attribute.id}
                                        name={attribute.name} 
                                        number={attribute.number}
                                        handleError={data.handleError}
                                        deleteAttribute={deleteAttribute}
                                    />
                        } else {
                            return <div key={data.nodeId + '_' + attribute.id}>
                                        Attribute Type of Attribute {attribute.id} is not implemented yet.
                                    </div>
                        }
                    })
                ) : (
                    <div className="node-attribute empty">
                        Empty
                    </div>
                )}
            </div>

            {editing && 
                <div className="button-panel adding">
                    <button
                        title="Add Text Attribute"
                        className="node-attribute-button add-text"
                        onClick={onAddTextClick}
                        >
                    <AddTextButton />
                    </button>
                    <button
                        title="Add Number Attribute"
                        className="node-attribute-button add-number"
                        onClick={onAddNumberClick}
                        >
                    <AddNumberButton />
                    </button>
                    <button
                        className="node-attribute-button add-list disabled"
                        title="Coming soon!"
                        >
                    <AddListButton />
                    </button>
                </div>
            }
            <Handle
                type="source"
                position="bottom"
            />
        </div>
    );
});

export default LudoNode;