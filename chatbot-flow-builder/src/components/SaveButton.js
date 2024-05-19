// src/components/SaveButton.js
import React from 'react';

const SaveButton = ({ elements, savedFlows, setSavedFlows, resetFlow }) => {
    const handleSave = () => {
        const targetHandles = elements
            .filter((el) => el.targetHandle)
            .map((el) => el.targetHandle);
        const uniqueTargetHandles = [...new Set(targetHandles)];

        if (uniqueTargetHandles.length < targetHandles.length) {
            alert("Cannot save Flow: More than one Node has empty target handles");
        } else {
            const flowName = `Flow_${+new Date()}`;
            setSavedFlows((flows) => [...flows, { name: flowName, elements }]);
            resetFlow();
            alert("Flow saved successfully!");
        }
    };

    return (
        <button onClick={handleSave}>Save Changes</button>
    );
};

export default SaveButton;
