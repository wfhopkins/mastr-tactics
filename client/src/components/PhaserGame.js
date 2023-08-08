import React, { useRef, useEffect } from 'react';
import Phaser from 'phaser';

const PhaserGame = () => {
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const config = {
      width: 300,
      height: 300
    };
    new Phaser.Game(config);
  }, []);

  return <div ref={gameContainerRef} />;
};

export default PhaserGame;
