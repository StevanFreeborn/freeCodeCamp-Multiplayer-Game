import Player from './player.mjs';
import Collectible from './collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const context = canvas.getContext('2d', { alpha: true });

const loadImage = src => {
  const img = new Image();
  img.src = src;
  return img;
};

const mainPlayerArt = loadImage('./public/characters/main-player.png');

socket.on('connect', () => {
  const player = new Player({
    x: '0',
    y: '0',
    w: '50',
    h: '50',
    score: 0,
    id: socket.id,
    isMain: true,
  })
  
  player.draw(context, null, { mainPlayerArt }, null);
});
