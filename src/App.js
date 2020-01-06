import React from 'react';
import otter from './otter.svg';
import './App.css';
import ProjectCompletionCalc from './ProjectCompletionCalc';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={otter} className="App-logo" alt="logo" />
      </header>
      <ProjectCompletionCalc></ProjectCompletionCalc>
    </div>
  );
}

export default App;
