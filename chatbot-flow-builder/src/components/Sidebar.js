import React from 'react';
import { useDrag } from 'react-dnd';

const NodeTypes = {
    TEXT: 'textNode',
};

const DraggableNode = ({ type, label }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                padding: '8px',
                margin: '4px',
                border: '1px dashed gray',
            }}
        >
            {label}
        </div>
    );
};

const Sidebar = ({ savedFlows, loadFlow, selectedNode, updateSelectedNode }) => {
    const handleLabelChange = (e) => {
        updateSelectedNode({
            ...selectedNode,
            data: { ...selectedNode.data, label: e.target.value },
        });
    };

    return (
        <div className="sidebar">
            <h3>Nodes</h3>
            <DraggableNode type={NodeTypes.TEXT} label="Send Message" />
            <h3>Saved Flows</h3>
            <ul>
                {savedFlows.map((flow, index) => (
                    <li key={index} onClick={() => loadFlow(flow)}>
                        Flow {index + 1}
                    </li>
                ))}
            </ul>
            {selectedNode && (
                <div className="node-settings">
                    <h3>Node Settings</h3>
                    <input
                        type="text"
                        value={selectedNode.data.label}
                        onChange={handleLabelChange}
                    />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
