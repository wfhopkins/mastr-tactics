import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      parent: gameContainerRef.current,
      width: 800, // Set the canvas width
      height: 600, // Set the canvas height
     
    };
    new Phaser.Game(config);
  }, []);

  return <div ref={gameContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default PhaserGame;
