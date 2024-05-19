// src/App.js
import React, { useState } from 'react';
import FlowBuilder from './components/FlowBuilder';
import SaveButton from './components/SaveButton';
import Sidebar from './components/Sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';

function App() {
  const [elements, setElements] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [savedFlows, setSavedFlows] = useState([]);

  const resetFlow = () => {
    setElements([]);
    setSelectedNode(null);
  };

  const loadFlow = (flowElements) => {
    setElements(flowElements);
    setSelectedNode(null);
  };

  const updateSelectedNode = (updatedNode) => {
    setElements((els) =>
      els.map((el) => (el.id === updatedNode.id ? updatedNode : el))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <div className="sidebar-container">
          <Sidebar
            savedFlows={savedFlows}
            loadFlow={loadFlow}
            selectedNode={selectedNode}
            updateSelectedNode={updateSelectedNode}
          />
        </div>
        <div className="main-container">
          <SaveButton
            elements={elements}
            savedFlows={savedFlows}
            setSavedFlows={setSavedFlows}
            resetFlow={resetFlow}
          />
          <FlowBuilder
            elements={elements}
            setElements={setElements}
            setSelectedNode={setSelectedNode}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
