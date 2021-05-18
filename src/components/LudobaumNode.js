import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default ({ data }) => {
  return (
    <div className="ludobaum-node">
      <Handle
        className="ludobaum-node-handle"
        type="target"
        position="top"
        onConnect={(params) => console.log('handle onConnect', params)}
      />
      <div className="ludobaum-node-title">
        {data.label}
      </div>
      <input
        className="nodrag"
        type="color"
        onChange={data.onChange}
        defaultValue={data.color}
      />
      <Handle
        className="ludobaum-node-handle"
        type="source"
        position="bottom"
        id="a" // TODO what does this do?
      />
    </div>
  );
};