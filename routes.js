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

//DATA BASE CONNECTION
var index = require('./index');
const { Client } = require('pg');
const theVault = new Client({
connectionString: "postgres://csicplnifqncpc:ce12c51c83e437148779a4f7e0d508722f0a5ce9f05f894f9b6f88b9f2d9b3f9@ec2-174-129-253-53.compute-1.amazonaws.com:5432/d70qi6m3chd89a",
ssl: true,
});
var uuid = require('node-uuid');
theVault.connect();
/* POSTGRES QUERY , VERIFICATION AND SAVING DATA FUNCTION TO THE VAULT 
	//Verifies if the channel doesn't already exists
	theVault.query('SELECT channel, channelhash FROM wtmchannels WHERE channel = $1 AND channelhash = $2', [channel, channelHash], (err, res) => {
	if(res.rowCount == 1){
		console.log("Channel Already in The Vault Database Records!");
			}else{
	//STORES DATA INTO WTM CHANNELS
	theVault.query('INSERT INTO wtmchannels (channel, channelhash) VALUES ($1, $2)', [channel, channelHash], (error, results) => {
		     if (error) {
		     throw error
		     	 }
			console.log("New Channel saved!")
				})//closes query
			} //closes else
						}) 
*/
exports.home = function(req, res){res.render('pages/main/index')};
exports.shadow = function(req, res){res.render('pages/main/shadow')};
//subscribe
exports.subscribing = function(req,res){
	var clName = req.body.subName; 
	var usrname = req.body.subUsername; 
	var email = req.body.subEmail; 
	var pwd = req.body.subPwd; 
	var rtPwd = req.body.subRtPwd; 
	var uuid_numbr = uuid.v4();
	var verified = 0;
	var dt = new Date();
	if (clName <= 3){
	return false;
	}else if (usrname <= 3){
	return false;
	}else if (email <= 3){
	return false;
	}else if(pwd <= 3){
	return false
	}else if (pwd != rtPwd){
	return false;
	}else{
	//Verifies if the user already exists
	theVault.query('SELECT Usrname FROM Usrs WHERE Usrname = $1', [usrname], (err, res) => {
	if(res.rowCount >= 1){
		console.log("Username already taken!");
			}else{	
			theVault.query('SELECT Email FROM Usrs WHERE Email = $1', [email], (err, res) => {
			if(res.rowCount >= 1){
			console.log("Email already taken!");
				}else{				
		//STORES DATA
		theVault.query('INSERT INTO usrs (uuid, name, usrname, email, password, Verified, last_update) VALUES ($1, $2, $3, $4, $5, $6, $7)', [uuid_numbr, clName, usrname, email, pwd, verified, dt], (error, results) => {
		if (error) {
		throw error
				 }
		console.log("New user saved!");
		console.log(clName + usrname + email + pwd);
			})//closes Insert New Usr Into Table
			}//else
			})// Closes second query - email
				} //closes else first query 
				}) //closes the vault first query - username
			}// Pwd do not match
			res.render('pages/main/runme');
				}//End Post Method	
							
//CLEAKER ANALYTICS ROUTES
exports.runme = function(req, res){res.render('pages/main/runme')};





