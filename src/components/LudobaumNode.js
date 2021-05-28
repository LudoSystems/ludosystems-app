import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

import TextAttribute from './TextAttribute';
import NumberAttribute from './NumberAttribute';
//import { ReactComponent as AddTextButton } from '../svg/button-add-text.svg';
//import { ReactComponent as AddNumberButton } from '../svg/button-add-number.svg';
//import { ReactComponent as AddListButton } from '../svg/button-add-list.svg';

const LudobaumNode = memo(({ data }) => {
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
                {data.attributes && data.attributes.map(attribute => {
                    if(attribute.type === "TEXT") {
                        return <TextAttribute 
                                    key={data.nodeId + '_' + attribute.id} 
                                    attributeId={attribute.id}
                                    name={attribute.name} 
                                    text={attribute.text}
                                    handleError={data.handleError}
                                />
                    } else if (attribute.type === "NUMBER") {
                        return <NumberAttribute 
                                    key={data.nodeId + '_' + attribute.id} 
                                    attributeId={attribute.id}
                                    name={attribute.name} 
                                    number={attribute.number}
                                    handleError={data.handleError}
                                />
                    } else {
                        return <div key={data.nodeId + '_' + attribute.id}>
                                    Attribute Type of Attribute {attribute.id} is not implemented yet.
                                </div>
                    }
                })}
            </div>
            <div>
                {/* TODO: this is where I'll add "add attribute" buttons for the three types
                 *
                 * Hint for future abbie: this should be on NodeController, not NodeAttributeController.
                 * 
                 * Same probably goes for delete and sort order but idk
                 *      <AddTextButton />
                    <AddNumberButton />
                    <AddListButton />
                 * 
                */}
            </div>
            <Handle
            type="source"
            position="bottom"
            />
        </>
    );
});

export default LudobaumNode;