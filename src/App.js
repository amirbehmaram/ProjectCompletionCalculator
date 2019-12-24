import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectCompletionCalc from './ProjectCompletionCalc';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <ProjectCompletionCalc></ProjectCompletionCalc>
    </div>
  );
}

export default App;
