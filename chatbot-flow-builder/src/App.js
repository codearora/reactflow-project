// src/App.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import FlowBuilder from './components/FlowBuilder';
import NodesPanel from './components/NodesPanel';
import SettingsPanel from './components/SettingsPanel';
import SaveButton from './components/SaveButton';
import './App.css';

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [elements, setElements] = useState([]);

  const updateSelectedNode = (updatedNode) => {
    const updatedElements = elements.map((el) =>
      el.id === updatedNode.id ? updatedNode : el
    );
    setElements(updatedElements);
    setSelectedNode(updatedNode);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <div className="sidebar">
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              updateSelectedNode={updateSelectedNode}
            />
          ) : (
            <NodesPanel />
          )}
          <SaveButton elements={elements} />
        </div>
        <FlowBuilder
          elements={elements}
          setElements={setElements}
          setSelectedNode={setSelectedNode}
        />
      </div>
    </DndProvider>
  );
}

export default App;
