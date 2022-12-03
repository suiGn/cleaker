var fs = require('fs');

//The fs.writeFile() method replaces the specified file and content if it exists. 
//If the file does not exist, a new file, containing the specified content, will be created:
//fs.writeFile('init1.js', 'init1;', function (err) {
  //if (err) throw err;
  //console.log('Saved!');
//});
let index = 5;

let key = 6;
let alfabeto = "abcdefghiklmnopqrstuvwxyz";
console.log(alfabeto.length);


      if(key > alfabeto.length){
        key = key % alfabeto.length;
      }else if(key + index > alfabeto.length){

          }
