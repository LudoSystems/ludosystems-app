import React, { memo, useState } from 'react';

import { Handle } from 'react-flow-renderer';

import AttributeService from "../services/AttributeService";

import TextAttribute from './TextAttribute';
import NumberAttribute from './NumberAttribute';

import { ReactComponent as AddTextButton } from '../svg/button-add-text.svg';
import { ReactComponent as AddNumberButton } from '../svg/button-add-number.svg';
import { ReactComponent as AddListButton } from '../svg/button-add-list.svg';

const LudobaumNode = memo(({ data }) => {
    const [attributes, setAttributes] = useState(data.attributes);

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

    return (
        <>
            <Handle
            type="target"
            position="top"
            />
            <div className="node-title">
            {data.label}
            </div>
            <div className="nodrag node-attributes">
                {attributes && attributes.map(attribute => {
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
                })}
            </div>
            <div className="nodrag node-attribute-button-panel">
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
            <Handle
            type="source"
            position="bottom"
            />
        </>
    );
});

export default LudobaumNode;