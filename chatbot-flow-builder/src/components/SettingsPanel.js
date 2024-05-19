// src/components/SettingsPanel.js
import React from 'react';

const SettingsPanel = ({ selectedNode, updateSelectedNode }) => {
    const handleTextChange = (event) => {
        const updatedNode = {
            ...selectedNode,
            data: { ...selectedNode.data, label: event.target.value },
        };
        updateSelectedNode(updatedNode);
    };

    return (
        <div className="settings-panel">
            <h3>Settings</h3>
            <label>
                Node Text:
                <textarea
                    value={selectedNode.data.label}
                    onChange={handleTextChange}
                />
            </label>
        </div>
    );
};

export default SettingsPanel;
