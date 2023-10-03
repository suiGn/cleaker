// Fill with your own data
/*
____ _  _ ____ _ _       ____ ____ ____ ____ _  _ _  _ ___ ____ 
|___ |\/| |__| | |       |__| |    |    |  | |  | |\ |  |  [__  
|___ |  | |  | | |___    |  | |___ |___ |__| |__| | \|  |  ___]
      email: '
    const imapUser = {
    user: x,
    password: x,
    host: 'imap.xxx.xxx',
    port: 993,
    tls: true,
    authTimeout: 3000
  };

*/                                                         
function addEmail(email) {
    imapUser.email = email;
    imapUser2.email = email;
  }

  const imapUser = {
    user: 'x',
    password: 'x',
    host: 'imap.xxx.xxx',
    port: 993,
    tls: true,
    authTimeout: 3000
  };

  addEmail('x');

  // Export the imapUser object
  module.exports = {
    imapUser,
    addEmail
  };
  