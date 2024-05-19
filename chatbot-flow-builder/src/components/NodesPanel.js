// src/components/NodesPanel.js
import React from 'react';
import { useDrag } from 'react-dnd';

const NodeTypes = {
    TEXT: 'textNode',
};

const NodesPanel = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: NodeTypes.TEXT,
        item: { type: NodeTypes.TEXT },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div className="nodes-panel">
            <div className="node" ref={drag}>
                Text Node
            </div>
        </div>
    );
};

export default NodesPanel;
