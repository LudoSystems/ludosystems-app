import React from 'react';

import { Handle } from 'react-flow-renderer';

import TextAttribute from './TextAttribute';

const LudobaumNode = ({ data }) => {
    // useEffect(() => {
    // }, []);
    // data.setWarning("oh no");


    // TODO:
    // For each attribute in data.attributes in order of .sortOrder,
    //      create NodeAttribute
    return (
        <>
            <Handle
            type="target"
            position="top"
            />
            <div className="node-title">
            {data.label}
            </div>
            <div className="node-attributes">
                {data.attributes && data.attributes.map(attribute => (
                    // TODO: Will need to make sure this works if there
                    // is no text.. I assume it doesn't.
                    // I might need to pass out a type or something else.
                    (attribute.text ? 
                        <TextAttribute 
                            key={data.nodeId + '_' + attribute.id} 
                            attributeId={attribute.id}
                            name={attribute.name} 
                            text={attribute.text}
                            handleError={data.handleError}
                        />
                    :   
                        <div key={data.nodeId + '_' + attribute.id}>Attribute Type of Attribute {attribute.id} is not implemented yet.</div>)
                ))}
            </div>
            <div>
                {/* TODO: this is where I'll add "add attribute" buttons for the three types*/}
            </div>
            <Handle
            type="source"
            position="bottom"
            />
        </>
    );
};

export default LudobaumNode;