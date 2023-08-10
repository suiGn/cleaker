//cleaked.js
console.log(`
    \ | /
    '  _  '
   -  |_|  -
    ' | | '
    _,_|___
   |   _ []|
   |  (O)  |
   |_______|it gets cleaked.
  `);

const Cleaker = require('./cleaker.js');
// Create a cleaked hash with sample data
let cleaked = Cleaker.cleak('John Doe', 'my_password', '192.168.1.1', 'USA', 'New York', 'Sample Referer');
// Print out the cleaked hash
console.log(cleaked);