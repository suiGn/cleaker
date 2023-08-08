// Fill with your own data
/*
____ _  _ ____ _ _       ____ ____ ____ ____ _  _ _  _ ___ ____ 
|___ |\/| |__| | |       |__| |    |    |  | |  | |\ |  |  [__  
|___ |  | |  | | |___    |  | |___ |___ |__| |__| | \|  |  ___] 
*/                                                         
const imapUser = {
    // Configuration options
    user: 'sysadmin@neurons.me',
    password: 'yourpassword',
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  };
  
  const imapUser2 = {
    // Configuration options
    user: 'sysadmin2@neurons.me',
    password: 'yourpassword2',
    host: 'imap2.gmail.com',
    port: 993,
    tls: true,
    authTimeout: 3000
  };


  
  // Export the imapUser object
  module.exports = {
    imapUser,
    imapUser2
  };
  