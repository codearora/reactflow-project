// src/components/SaveButton.js
import React from 'react';
import { getConnectedEdges } from 'react-flow-renderer';

const SaveButton = ({ elements }) => {
    const handleSave = () => {
        const errors = validateFlow(elements);
        if (errors.length > 0) {
            alert(errors.join('\n'));
        } else {
            alert('Flow saved successfully!');
        }
    };

    const validateFlow = (elements) => {
        const nodes = elements.filter((el) => el.type);
        const edges = elements.filter((el) => el.source && el.target);

        const nodeConnections = {};
        nodes.forEach((node) => {
            nodeConnections[node.id] = { incoming: 0, outgoing: 0 };
        });

        edges.forEach((edge) => {
            nodeConnections[edge.source].outgoing += 1;
            nodeConnections[edge.target].incoming += 1;
        });

        const nodesWithEmptyTargets = nodes.filter((node) => nodeConnections[node.id].incoming === 0);

        if (nodes.length > 1 && nodesWithEmptyTargets.length > 1) {
            return ['Error: More than one node has empty target handles.'];
        }

        return [];
    };

    return (
        <button onClick={handleSave}>Save Flow</button>
    );
};

export default SaveButton;
