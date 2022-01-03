const { resolve } = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        actors: resolve(__dirname, 'pages/actors.html'),
        frames: resolve(__dirname, 'pages/frames.html'),
        sounds: resolve(__dirname, 'pages/sounds.html'),
      },
    },
  },
});
