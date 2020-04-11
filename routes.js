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

//WTM ROUTES
exports.wtm = function(req, res){res.render('pages/wtm/index')};
exports.wtmTemplate = function(req, res){res.render('pages/template')};
exports.push = function(req, res){res.render('pages/push')};
exports.www = function(req, res, next){res.send('respond with a resource')};
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


