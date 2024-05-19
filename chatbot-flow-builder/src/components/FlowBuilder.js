// src/components/FlowBuilder.js
import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Handle,
} from 'react-flow-renderer';
import { useDrop } from 'react-dnd';

const NodeTypes = {
    TEXT: 'textNode',
};

const CustomNode = ({ id, data, updateLabel }) => {
    const [editing, setEditing] = useState(false);
    const [label, setLabel] = useState(data.label);

    const handleLabelChange = (e) => {
        setLabel(e.target.value);
    };

    const handleLabelBlur = () => {
        updateLabel(id, label);
        setEditing(false);
    };

    return (
        <div className="custom-node">
            {editing ? (
                <input
                    type="text"
                    value={label}
                    onChange={handleLabelChange}
                    onBlur={handleLabelBlur}
                    autoFocus
                />
            ) : (
                <div onClick={() => setEditing(true)}>{data.label}</div>
            )}
            <Handle type="source" position="right" />
            <Handle type="target" position="left" />
        </div>
    );
};

const FlowBuilder = ({ elements, setElements, setSelectedNode }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(elements);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const updateLabel = (nodeId, newLabel) => {
        setNodes((prevNodes) =>
            prevNodes.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel } } : node
            )
        );
    };

    const [, drop] = useDrop({
        accept: NodeTypes.TEXT,
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const newNode = {
                id: `node_${+new Date()}`,
                type: 'default',
                position: { x: offset.x, y: offset.y },
                data: { label: 'Send Message' },
            };
            setNodes((nds) => [...nds, newNode]);
        },
    });

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onElementClick = (_, element) => setSelectedNode(element);

    useEffect(() => {
        setElements([...nodes, ...edges]);
    }, [nodes, edges, setElements]);

    return (
        <div
            ref={drop}
            style={{
                height: '80vh',
                width: '100%',
                border: '1px solid black',
                position: 'relative',
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onElementClick={onElementClick}
                nodeTypes={{
                    default: CustomNode,
                }}
                style={{ width: '100%', height: '100%' }}
            >
                <Background />
                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default FlowBuilder;
