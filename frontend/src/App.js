import logo from './logo.svg';
import React from 'react';
import WebechatComponent from './component/webChatComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <WebechatComponent />
        </div>
  
      </header>
    </div>
  );
}

export default App;
