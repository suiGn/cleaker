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
        //parse JSON message.
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('Not a valid JSON: ', message.data);
            return;
        }
		//TYPES OF WS PACKETS FROM SERVER
        if (json.type === 'gemEx'){ 
			gemExRes(json.status, json.rcolor);
        } 
		else if (json.type === 'hipUser'){
			hipUsrRes(json.status, json.rcolor);
			
        }
        
	};// ON Incoming Messages Closure
	
    connection.onerror = function (error) {
        //just in case there were some problems with connection...
        alert('i am Error - ' + connection.onERROR);
    };
	
	
	//      _ ___   _  _  __
	//  |V||_  ||_|/ \| \(_ 
	//  | ||__ || |\_/|_/__)
	//  LOVE & Memories AFTER ALL.
    /***/
		
	 
	
	function emailRegex(email) { //EMAIL REGEX
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
	}
	
	function validateName(subname){ //NAME REGEX
		var re = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
		return re.test(subname);
 	
	}
 
	function usrnmRegex(username){ //USERNAME REGEX
		var re = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
		return re.test(username);
	}
	
	
		function gemEx(value){
		connection.send(JSON.stringify({clkcd: 'verEmEx' , email: value}));
		}
		function gemExRes(value, rcolor){
   	 	   $("#labelEmail").text(value);
		   document.getElementById("inputEmail").style.borderColor = rcolor;
		}
		function gUsrSnd(value){
		connection.send(JSON.stringify({clkcd: 'gUsrRes' , usrname: value}));
		}
		function hipUsrRes(value, rcolor){
		$("#labelUsername").text(value);
		document.getElementById("inputUsername").style.borderColor = rcolor;
		
		}
		
	 function validateForm() {
		 $labelName = $("#labelName");
		 var subName = document.forms["subForm"]["subName"].value;
		 var inputName =  document.getElementById("inputName");
		 $labelUsername = $("#labelUsername");
		 var subUsername = document.forms["subForm"]["subUsername"].value;
		 var inputUsername =  document.getElementById("inputUsername");
		 $labelEmail = $("#labelEmail");
		 var subEmail = document.forms["subForm"]["subEmail"].value;
		 var inputEmail =  document.getElementById("inputEmail");
		 var subPwd = document.forms["subForm"]["subPwd"].value;
		 var subRtPwd = document.forms["subForm"]["subRtPwd"].value;
		 
		 if (subName == "") { //Check if name is null
			 alert("Missing Name");
			 return false;
		 }
		if (validateName(subName)) { // Validate Name
			$labelName.text("");
			inputName.style.borderColor = "#39D1BB";
		} else {
			$labelName.text('Names must be Aa-Zz and "-" characters');
			inputName.style.borderColor = "#ff6666";
			inputName.focus();
			return false;
		}
		if (usrnmRegex(subUsername)) { //Validate Username
			$labelUsername.text("");
			inputUsername.style.borderColor = "#39D1BB";
		} else {
			$labelUsername.text('Invalid username.');
			inputUsername.style.borderColor = "#ff6666";
			inputUsername.focus();
			return false;
		}    
		
		 if (subUsername == ""){ //check if username is null
			$labelUserName.text("Choose a username");
			inputName.style.borderColor = "#ff6666";
			inputName.focus();
			 return false;
		 }
		 
		 if (subEmail == ""){
			 alert("Email must be filled out!");
			 return false;
		 }
		if (emailRegex(subEmail)) {
			$labelEmail.text("");
			inputEmail.style.borderColor = "#39D1BB";
		} else {
			$labelEmail.text("Invalid Email.");
			inputEmail.style.borderColor = "#ff6666";
			inputEmail.focus();
			return false;
	   }
	   if (subPwd == ""){
		   alert("Please type a Password!");
		   return false;
	   }
	   if (subRtPwd == ""){
		   alert("Please confirm Password!");
		   return false;
	   }
	   if (subRtPwd != subPwd){
		   alert("Password does not match!");
		   return false;
	   }else {
		   return true;		
		 }  
	 }
	 
	 var i = 0;
	 var speed = 50; /* The speed/duration of the effect in milliseconds */
	 var txt = "Fill out your information."
	 function typeWriter() {
	   if (i < txt.length) {
	     document.getElementById("mndTlks").innerHTML += txt.charAt(i);
	     i++;
	     setTimeout(typeWriter, speed);
	   }
	 }
	 
	 
	 function onSubscribe(){
		 var subscribeDiv = document.getElementById("subscribeDiv");
		 subscribeDiv.style.display = "block";	
		 subscribeDiv.scrollIntoView({block: 'end', behavior: 'smooth'});
		 document.getElementById("loginDiv").style.display = "none";
		 document.getElementById("mndTlks").innerHTML = " ";
		 typeWriter();
		 
		  
	 }
	 
	 function xSubscribe(){
		 document.getElementById("subscribeDiv").style.display = "none";						
	 }
		 
	 function onLogin(){
		 document.getElementById("subscribeDiv").style.display = "none";	
		 document.getElementById("loginDiv").style.display = "block";
		 document.getElementById("loginDiv").scrollIntoView();
	 }
		 
	 function xLogin(){
		 document.getElementById("loginDiv").style.display = "none";						
	 }
		
		
									
	





