/** 
		┌─┐┬  ┌─┐┌─┐┬┌─┌─┐┬─┐
		│  │  ├┤ ├─┤├┴┐├┤ ├┬┘
		└─┘┴─┘└─┘┴ ┴┴ ┴└─┘┴└─  
 codedBY suiGN
Under MIT LICENSE
cleakerRM **/
$(function () {
    "use strict";
	var myUUID = "";
    //if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    //if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', { text: 'Sorry, no WebSocket support on your browser.'} ));
        input.hide();
        $('span').hide();
        return;
    }
	
	
    //open connection
	var HOST = location.origin.replace(/^http/, 'ws')
    var connection = new WebSocket(HOST);
    connection.onopen = function () {
		//clkcd is the code used to know what kind of connection is it. CleakerRunMe is a type.
		//runmeMasterMind is the code for our main survillance.
	connection.send(JSON.stringify({clkcd: 'CleakerRunMe' , cleakerRoom: "runmeMasterMind", cleaker: "cleakerRunme"}));
		console.log(`%c connected________________________________________
			
			 ██████╗██╗     ███████╗ █████╗ ██╗  ██╗███████╗██████╗ 
			██╔════╝██║     ██╔════╝██╔══██╗██║ ██╔╝██╔════╝██╔══██╗
			██║     ██║     █████╗  ███████║█████╔╝ █████╗  ██████╔╝
			██║     ██║     ██╔══╝  ██╔══██║██╔═██╗ ██╔══╝  ██╔══██╗
			╚██████╗███████╗███████╗██║  ██║██║  ██╗███████╗██║  ██║
 		   	 ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`, "font-family:monospace")
			function foo() {
			    connection.send(JSON.stringify({clkcd: 'keepMeAlive'}));
			    setTimeout(foo, 55000);
					}
			foo();
    };
	
	
    //most important part - incoming messages
    connection.onmessage = function (message) {
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
        if (json.type === 'logIn'){ //first response from the server with user's color
			console.log(message.data);
            //from now user can start sending messages
        } else if (json.type === 'stayingAlive'){
			console.log("--");
        	
        }
	};
	
    connection.onerror = function (error) {
        //just in case there were some problems with connection...
        content.html($('<p>', { text: 'i am Error -  ' + 'Connection.onERROR' } ));
    };
	
	
	//      _ ___   _  _  __
	//  |V||_  ||_|/ \| \(_ 
	//  | ||__ || |\_/|_/__)
	//  LOVE & Memories AFTER ALL.
    /***/
		
	
});
