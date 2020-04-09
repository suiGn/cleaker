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
	var cleakedRow = $('#cleakedDiv');
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
        if (json.type === 'clkr_Start'){ // Receiving Active User.
			console.log(message.data);
			addCleakedDiv(json.cleaker);
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
		
		function addCleakedDiv(cleaked){
		   	 	cleakedRow.append('<div class="pck w-clearfix">\
          <div class="text-span-2 _111 lowest">O</div>\
		  <div class="text-span-2 _111 _11">O</div>\
          <div class="text-block-3 dataset">' + cleaked.uuid + '</div>\
          <div class="text-block-3">' + cleaked.onDate + '</div>\
          <div class="text-block-3 datatext">' + cleaked.usrname + ' - ' + cleaked.browser + '</div>\
          <div class="text-block-3">' + cleaked.usrCity + '</div>\
          <div class="pck-viewall" data-ix="vwmtd" onclick="viewElement()">[ view]</div>\
          <div class="vwmtd" id=>\
            <div class="scrollable-cleaker-text openconnection">\
				Client: usrname,\
				<br>Connection Time: 2:12:45pm 06-16-2019,\
				<br>url:<a href="https://" class="link">https://www.ebul.com/</a>, \
				<br>urlAuthor: David Delgadillo,\
				<br>usrCountry: USA,\
				<br>usrCity: \
				<br> Closed: monday 12:12:45pm 06-16-2019,\
				<br>dlyVisits: 8,\
				<br>ystdy: 7,\
				<br>wklyVisits: 34,\
				<br>lstwk: 38,\
				<br>mnthlyVisits: 144,\
				<br>lstmnth: 132,\
				<br>pushNotifications: No,\
				<br>Cookies: yes,\
				<br>Monetization:\
			</div>\
          </div>\
        </div>');	
		var scrollingDiv = document.getElementById("cleakedDiv"); 
		  scrollingDiv.scrollIntoView(false); // Bottom
						}
		
	
});




