/*

______ _____ _   _ _____ _____ _____ 
| ___ \  _  | | | |_   _|  ___/  ___|
| |_/ / | | | | | | | | | |__ \ `--. 
|    /| | | | | | | | | |  __| `--. \
| |\ \\ \_/ / |_| | | | | |___/\__/ /
\_| \_|\___/ \___/  \_/ \____/\____/ 
							CLEAKER
CODED BY: SUI GENERIS 
SIMPLE AND MASSIVE.
*/

const { Client } = require('pg');
const theVault = new Client({
  connectionString: "postgres://ytuydgrxxnommy:2f617ca7b4aa4a350e7944845efc9c24ccc7e9849dc4531ca7aa56b5923df417@ec2-107-20-177-161.compute-1.amazonaws.com:5432/d7gfkci480v21o",
  ssl: true,
});

exports.home = function(req, res){res.render('pages/main/index')};
exports.shadow = function(req, res){res.render('pages/main/shadow')};
//CLEAKER ANALYTICS ROUTES
exports.runme = function(req, res){res.render('pages/main/runme')};
theVault.connect();




