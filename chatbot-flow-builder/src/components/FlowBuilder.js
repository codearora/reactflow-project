// src/components/FlowBuilder.js
import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
} from 'react-flow-renderer';
import { useDrop } from 'react-dnd';

const NodeTypes = {
    TEXT: 'textNode',
};

const FlowBuilder = ({ elements, setElements, setSelectedNode }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(elements);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    const onElementClick = (_, element) => setSelectedNode(element);

    const [{ isOver }, drop] = useDrop({
        accept: NodeTypes.TEXT,
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            const newNode = {
                id: `node_${+new Date()}`,
                type: 'default',
                position: { x: offset.x, y: offset.y },
                data: { label: 'Text Node' },
            };
            setNodes((nds) => [...nds, newNode]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    React.useEffect(() => {
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
