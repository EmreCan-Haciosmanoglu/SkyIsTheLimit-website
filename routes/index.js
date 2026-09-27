var express = require('express');
var router = express.Router();
const path = require('path');
const archiver = require('archiver');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/download', (req, res) => {
  const pathToTheGame = 'C:/Devs/Versions/Game_v0.1';

  // Create ZIP archive
  const archive = archiver('zip', {
    zlib: { level: 9 }
  });

  // Handle errors
  archive.on('error', (err) => {
    console.error('ZIP error:', err);
    res.status(500).end();
  });

  // Tell browser this is a ZIP download
  res.attachment('Game.zip');

  // Pipe ZIP directly to response
  archive.pipe(res);

  // Add Game.exe
  archive.file(
    path.join(pathToTheGame, 'Game.exe'),
    {
      name: 'Game_v0.1/Game.exe'
    }
  );

  // Add shaders directory
  archive.directory(
    path.join(pathToTheGame, 'assets/shaders'),
    'Game_v0.1/assets/shaders'
  );

  // Add objects directory
  archive.directory(
    path.join(pathToTheGame, 'assets/objects'),
    'Game_v0.1/assets/objects'
  );

  // Finish ZIP
  archive.finalize();
});

module.exports = router;