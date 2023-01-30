const fs = require('fs');

//passsing directoryPath and callback function
fs.readdir('/', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    console.log("Scanning dirs.");
    console.log(files);
    //listing all files using forEach
    files.forEach(function (file) {    
        let pfile = "/" + file; 
        fs.readdir(pfile, function(err, subDir){
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
           // console.log(file);
            //console.log(subDir);
          
                });
            });
    });