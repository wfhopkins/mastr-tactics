import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Phaser from 'phaser';


const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2d2d2d',
  parent: 'phaser-example',
  // scene: Example
};

const game = new Phaser.Game(config);





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
