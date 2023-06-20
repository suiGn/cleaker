//include src/users.js
console.log("Starting Cleaker");
const users = require('./src/users');



//export to global
module.exports = {
  users,
};

