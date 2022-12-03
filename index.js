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



  
  const fs = require('fs');

  async function readFileSync (fileName) {
      return new Promise((resolve, reject) => {
          fs.readFile(fileName, (err, data) => {
              if (err) {
                  reject(err);
              }
              resolve(data);
          });
      });
  };
  

 