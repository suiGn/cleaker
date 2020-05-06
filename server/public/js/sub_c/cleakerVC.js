/** 
		┌─┐┬  ┌─┐┌─┐┬┌─┌─┐┬─┐
		│  │  ├┤ ├─┤├┴┐├┤ ├┬┘
		└─┘┴─┘└─┘┴ ┴┴ ┴└─┘┴└─  
 codedBY suiGN
Under MIT LICENSE
cleakerRM **/

    //if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    //if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', { text: 'Sorry, no WebSocket support on your browser.'} ));
        input.hide();
        $('span').hide();
    }
	
    //open connection
	var HOST = location.origin.replace(/^http/, 'ws')
    var connection = new WebSocket(HOST);
	//var connection = new WebSocket("wss://cleaker.herokuapp.com");
    connection.onopen = function () {
		//clkcd is the code used to know what kind of connection is it. CleakerRunMe is a type.
		//runmeMasterMind is the code for our main survillance.

		
		
		console.log(`%c connected________________________________________
			
			 ██████╗██╗     ███████╗ █████╗ ██╗  ██╗███████╗██████╗ 
			██╔════╝██║     ██╔════╝██╔══██╗██║ ██╔╝██╔════╝██╔══██╗
			██║     ██║     █████╗  ███████║█████╔╝ █████╗  ██████╔╝
			██║     ██║     ██╔══╝  ██╔══██║██╔═██╗ ██╔══╝  ██╔══██╗
			╚██████╗███████╗███████╗██║  ██║██║  ██╗███████╗██║  ██║
 		   	 ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`, "font-family:monospace")
			
		
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
        if (json.type === 'gemEx'){ 
			//console.log(message.data);
			gemExRes(json.status);
            //from now user can start sending messages
        } 
        
	};
	
    connection.onerror = function (error) {
        //just in case there were some problems with connection...
        alert('i am Error - ' + connection.onERROR);
    };
	
	
	//      _ ___   _  _  __
	//  |V||_  ||_|/ \| \(_ 
	//  | ||__ || |\_/|_/__)
	//  LOVE & Memories AFTER ALL.
    /***/
				
		function gemEx(value){
		connection.send(JSON.stringify({clkcd: 'verEmEx' , email: value}));
		}
		function gemExRes(value){
		$labelEmail = $("#labelEmail");
		$labelEmail.text(value);
		}
		
		
									
	





