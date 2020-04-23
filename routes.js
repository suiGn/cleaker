/*
______ _____ _   _ _____ _____ _____ 
| ___ \  _  | | | |_   _|  ___/  ___|
| |_/ / | | | | | | | | | |__ \ `--. 
|    /| | | | | | | | | |  __| `--. \
| |\ \\ \_/ / |_| | | | | |___/\__/ /
\_| \_|\___/ \___/  \_/ \____/\____/ 
APP: CLEAKER
CODED BY: SUI GENERIS 
SIMPLE AND MASSIVE.
*/

var passport = require(“passport”);
var request = require(‘request’);
const { Pool, Client } = require(‘pg’)
const bcrypt = require(‘bcrypt’)
const uuidv4 = require(‘uuid/v4’);
const LocalStrategy = require(‘passport-local’).Strategy;
const pool = new Pool({
 user: process.env.PGUSER,
 host: process.env.PGHOST,
 database: process.env.PGDATABASE,
 password: process.env.PGPASSWORD,
 port: process.env.PGPORT,
 ssl: true
});
const theVault = new Client({
  connectionString: "postgres://ytuydgrxxnommy:2f617ca7b4aa4a350e7944845efc9c24ccc7e9849dc4531ca7aa56b5923df417@ec2-107-20-177-161.compute-1.amazonaws.com:5432/d7gfkci480v21o",
  ssl: true,
});

exports.home = function(req, res){res.render('pages/main/index')};
exports.shadow = function(req, res){res.render('pages/main/shadow')};
//CLEAKER ANALYTICS ROUTES
exports.runme = function(req, res){res.render('pages/main/runme')};
theVault.connect();

//WTM ROUTES
exports.wtm = function(req, res){res.render('pages/wtm/index')};
exports.wtmTemplate = function(req, res){res.render('pages/template')};
exports.push = function(req, res){res.render('pages/push')};
exports.www = function(req, res, next){res.send('respond with a resource')};




