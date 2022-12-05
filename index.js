console.log("welcome gallegos");
const fs = require('fs');

//passsing directoryPath and callback function
fs.readdir('/', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        console.log(file); 
    });
  });



  
  