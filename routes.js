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
	user: "csicplnifqncpc",//process.env.PGUSER,
	host: "ec2-174-129-253-53.compute-1.amazonaws.com",//process.env.PGHOST,
 database: "d70qi6m3chd89a", //process.env.PGDATABASE,
 password: "ce12c51c83e437148779a4f7e0d508722f0a5ce9f05f894f9b6f88b9f2d9b3f9",//process.env.PGPASSWORD,
 port: "5432",
 ssl: true
});
//const theVault = new Client({
  //connectionString: "postgres://ytuydgrxxnommy:2f617ca7b4aa4a350e7944845efc9c24ccc7e9849dc4531ca7aa56b5923df417@ec2-107-20-177-161.compute-1.amazonaws.com:5432/d7gfkci480v21o",
  //ssl: true,
  //});

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

app.post('/join', async function (req, res) {
	
 try{
 const client = await pool.connect()
 await client.query('BEGIN')
 var pwd = await bcrypt.hash(req.body.password, 5);
 await JSON.stringify(client.query('SELECT id FROM “users” WHERE “email”=$1', [req.body.username], function(err, result) {
 if(result.rows[0]){
 req.flash('warning', "This email address is already registered. <a href='/login'>Log in!</a>");
 res.redirect('/join');
 }
 else{
 client.query('INSERT INTO users (id, “firstName”, “lastName”, email, password) VALUES ($1, $2, $3, $4, $5)', [uuidv4(), req.body.firstName, req.body.lastName, req.body.username, pwd], function(err, result) {
 if(err){console.log(err);}
 else {
 
 client.query('COMMIT')
 console.log(result)
 req.flash('success','User created.')
 res.redirect('/runme');
 return;
 }
 });
 }
 }));
 client.release();
 } 
 catch(e){throw(e)}
 });




//Open Channel - It queries if the channel and channel hash already exists, if not it creates a new channel
exports.openChannel = function(req,res){
		const channel = req.body.channel; //INPUT CHANNEL 
		const channelHash = req.body.channelHash; //INPUT CHANNEL-HASH
		console.log('Channel Opened: ' + channel, channelHash); //JUST FOR DEVELOPMENT PURPOSES
		res.render('pages/wtm/media', { channel: channel, channelHash: channelHash });				
					}//ENDS POST FUNCTION
//Open Public Channel - It GETS the channel and hash from
exports.publicChannel = function(req,res){
		const channel = req.params.channel; //INPUT CHANNEL 
		const channelHash = "wtm-public-fuckoff-Hash" //INPUT CHANNEL-HASH
		console.log('0. ChannelOn::::' + channel, channelHash); //JUST FOR DEVELOPMENT PURPOSES
					res.render('pages/wtm/media', { channel: channel, channelHash: channelHash });				
			}//ENDS POST FUNCTION


