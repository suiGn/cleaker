/** SERVER APP: CLEAKER **
  /$$$$$$  /$$       /$$$$$$$$  /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$$ 
 /$$__  $$| $$      | $$_____/ /$$__  $$| $$  /$$/| $$_____/| $$__  $$
| $$  \__/| $$      | $$      | $$  \ $$| $$ /$$/ | $$      | $$  \ $$
| $$      | $$      | $$$$$   | $$$$$$$$| $$$$$/  | $$$$$   | $$$$$$$/
| $$      | $$      | $$__/   | $$__  $$| $$  $$  | $$__/   | $$__  $$
| $$    $$| $$      | $$      | $$  | $$| $$\  $$ | $$      | $$  \ $$
|  $$$$$$/| $$$$$$$$| $$$$$$$$| $$  | $$| $$ \  $$| $$$$$$$$| $$  | $$
 \______/ |________/|________/|__/  |__/|__/  \__/|________/|__/  |__/
*** CODED BY sui Gn
Put a line to the editor
plug it to your brain
****/
////carrier : <script src="https://cleaker.herokuapp.com/js/sub_c/cleaker.js"></script>
//SETTING UP SERVER VARIABLES AND DEPENDENCIES
/** Global variables */
const forceSecure = require("force-secure-express");
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const cleakerPort = 31416;
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var bodyParser = require("body-parser");
var routes = require('./routes');
var unicorn = "🍺🦄🍺";
var uuid = require('node-uuid');

const server = express()
	//SETTING UP ROUTING SPECS
 	.use(bodyParser.urlencoded({ extended: false }))
 	.use(bodyParser.json())
	.use(forceSecure(["cleaker.me","wwww.cleaker.me"])) // FORCE SSL
	.use(express.static(path.join(__dirname, 'server/public')))
	.set('views', path.join(__dirname, 'server/views'))
	.set('view engine', 'ejs')
	//ROUTING Cleaker 
	.get('/', routes.home)
	.get('/subscribing', routes.subscribing)
	//Shadow
	.get('/shadow', routes.shadow)
	.get('/runme', routes.runme)
	//Routing WTM
	
	.listen(PORT, () => console.log(`Cleaker on PORT: ${ PORT }
	freelanding ${ unicorn }`));
		/*_      _____ ___ ___  ___   ___ _  _____ _____ 
		 \ \    / / __| _ ) __|/ _ \ / __| |/ / __|_   _|
	      \ \/\/ /| _|| _ \__ \ (_) | (__| ' <| _|  | |  
		   \_/\_/ |___|___/___/\___/ \___|_|\_\___| |_|
					┌─┐┬  ┌─┐┌─┐┬┌─┌─┐┬─┐
					│  │  ├┤ ├─┤├┴┐├┤ ├┬┘
					└─┘┴─┘└─┘┴ ┴┴ ┴└─┘┴└─    
				serverside websocket managment **/
		// Port where we'll run the websocket server
		var webSocketServer = require('websocket').server;
		var clients = [ ];
		var allMembers = [ ];
		
		//      _ ___   _  _  __
		//  |V||_  ||_|/ \| \(_ 
		//  | ||__ || |\_/|_/__)	
			
			function brdCstRight(room, obj){ //broadcast to room membrs Only
			var BroadCastMembers = [ ];
	     	//Filters only members belonging to the same room
			const members = allMembers.filter(goes => goes.room === room);
			//Once filtered to only same room members to broadcast
			members.forEach(function(element) {BroadCastMembers.push(element.client);});
			// broadcast message to all connected clients in room
			BroadCastMembers.forEach(function(EndClient){EndClient.sendUTF(obj);});	
				};
				
		/** Helper function for escaping input strings */
		function htmlEntities(str) {
			return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
						      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
								}			
		// Array with some colors
		var colors = [ '#a8d069', '#30ad64', '#25ccbf', '#20ac99', '#f8c740', '#e2a62b',
								 '#face6a', '#e4b962', '#fd7072', '#cf404d', '#d39f9a', 
								'#735260', '#af4173', '#822e50', '#e64c40', '#bf3a30','#fc7d64','#49647b'];
		// ... in random order
		colors.sort(function(a,b) { return Math.random() > 0.5; } );
		
		
			     /** WebSocket code o       o                                
									|       |                               
									o   o   o  
 	   								 \ / \ / 
 	   								  o   o  */
		
		var wsServer = new webSocketServer({
	    httpServer: server
			});
			
	// WebSocket server Starts from Here
	wsServer.on('request', function(request) {
			   var uuid_numbr = uuid.v4();
			//accept connection if check 'request.origin'
			   var connection = request.accept(); //connecting from same website
			   var index = clients.push(connection) - 1; //client index to remove them on 'close' event
			   //A connection was acepted.
			   //console.log('1. wsOnRqstLog - Connection Accepted UUID: ' + uuid_numbr + ' Request.Origin: ' + request.origin);
			   
			    //starts - comunication with user - connection.on 
			   connection.sendUTF(JSON.stringify({ type:'cleaked', uuid: uuid_numbr})); // 'cleaked' -- cleaker.js handshake innitiation
			   
			   //Listening - on incoming comunication
				  connection.on('message', function(message) {
					if (message.type === 'utf8') { //IF TEXT
						pckr = JSON.parse(message.utf8Data); //parse to json
	   					//Create room member for redirection.
						if (pckr.clkcd === 'CleakerRunMe') {
	   					var runMeMember = {
	   						room: pckr.cleakerRoom,
	   						index: index,
	   						client: connection,
							uuid: uuid_numbr
						}	
	   			  //Push into the array
	   			  allMembers.push(runMeMember) - 1;// index to remove them on 'close' event;			
				} else if (pckr.clkcd === 'onCleaker'){ // RECEIVING CLEAKER 
				//console.log(pckr.cleaker); //for dev purposes, remove to not saturate the console.
				//packet - send INFORMATION TO RUNME
				   var activeUser = JSON.stringify({ type: "clkr_Start", cleaker: pckr.cleaker});
				   //console.log(pckr.cleaker);
				   brdCstRight("runmeMasterMind", activeUser);
					
				} else if (pckr.clkcd === 'appCleaker'){ // RECEIVING CLEAKER APP
					console.log(pckr.cleaker);
				}else if (pckr.clkcd === 'keepMeAlive'){
				 //packet - send Notification user logedIn to Room Members
					console.log("keepme");
				 	 var stayingAlive = JSON.stringify({ type: "stayingAlive", chorus: "A A A A"});
				 	 brdCstRight("runmeMasterMind", stayingAlive);
								}
				
				}
								});//END CONNECTION.ON MESSAGE		
															
				// User disconnected
				connection.on('close', function(connection) {
						//console.log(".disconnected - UUID:" + uuid_numbr);//logoutRecord
						clients.splice(index, 1);// remove user from the list of connected clients
						}); 
					}); // FINISHES WEB SERVER ON