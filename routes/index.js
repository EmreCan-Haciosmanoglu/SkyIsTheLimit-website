var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
var zip = require('express-zip');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/download', (req, res) => {
  var arrOfFile = [];

  const pathToTheGame = 'C:/Devs/Versions/Game_v0.1';
  arrOfFile.push({ path: pathToTheGame + '/Game.exe', name: '/Game_v0.1/Game.exe' });
  
  var directoryPath = path.join(pathToTheGame, '/assets/shaders');
  fs.readdir(directoryPath, (err, files) => {
    if (err) 
      return console.log('Unable to scan directory: ' + err);
      
    files.forEach(file => {
      arrOfFile.push({ path: pathToTheGame + '/assets/shaders/' + file, name: '/Game_v0.1/assets/shaders/'+ file });
    });
  });
  directoryPath = path.join(pathToTheGame, '/assets/objects');
  fs.readdir(directoryPath, (err, files) => {
    if (err) 
      return console.log('Unable to scan directory: ' + err);
      
    files.forEach(file => {
      arrOfFile.push({ path: pathToTheGame + '/assets/objects/' + file, name: '/Game_v0.1/assets/objects/'+ file });
    });
  });
  
  res.zip( arrOfFile, "Game.zip");
});


module.exports = router;
