/*
	restToSerial
	a node.js app to read take requests and send as serial data
	requires:
		* node.js (http://nodejs.org/)
		* serialport.js (https://github.com/voodootikigod/node-serialport)
	
	To launch this, type 'node index.js portname' on the commandline, where
	portname is the name of your serial port.
		
	Modified from Tom Igoe's restToSerial example https://github.com/tigoe/NetworkExamples/tree/master/nodeRestToSerial

*/

var serialport = require("serialport"),		// include the serialport library
	express = require('express'),		// include express
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path');


//ARRAY OF KEYBOARD STATES
//--------------------------
//               123456789
var keyStates = "000000000";
//var keyStates = [1,0,0,0,0,0,0,0,0];

//SERVER SETUP
//--------------------------
app.use(express.static('public'));
//app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// respond to web GET requests for the index.html page:
app.get('/index*', function(req, res) {
	res.type('.html').sendFile(path.join(__dirname + '/public/index.html'));
	console.log(path.join(__dirname + '/public/index.html'));
});

app.get('/api/v1/globalKeys', function(req, res){
	reportKeys();
	res.sendStatus(keyStates);
});

app.post('/api/v1/', function(req, res){
	var keyboardID = req.body.keyboardID; 
	var keysHit = req.body.keysHit;
	parseKeys(keysHit);

	var d = new Date();
	var t = d.getTime();
	console.log("POST recieved at %s", t);
	console.log("POSTED Keyboard ID: " + keyboardID);
	console.log("POSTED Keys hit: " + keysHit);

	
	res.send(keyStates);
	//DO SOMETHING HERE
});


var parseKeys = function(keyData){
	keyStates = "" + keyData;
	reportKeys();
	//console.log("INPUT PARSED");
}

// now that everything is configured, start the server:
var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
  //reportKeys();
});


var reportKeys = function (){
  console.log('Current state of keys:' + keyStates);
}




//SERIAL STUFF ERMERGERD
//--------------------------

// open the serial port. Uses the command line parameter:
var SerialPort = serialport.SerialPort; // localize object constructor
var serialPort = new SerialPort("/dev/tty.usbmodem1421", {
	parser: serialport.parsers.readline("\r\n")
  	//baudrate: 9600
});

serialPort.on("open", function () {
  console.log('serial port open.');
  serialPort.on('data', function(data) {
    //console.log('data received: ' + data);
    parseKeys(data);
  });
  serialPort.write("ls\n", function(err, results) {
    // console.log('err ' + err);
    // console.log('results ' + results);
  });
});

/* The rest of the functions are event-driven. 
*/

function sendToSerial(request) {
  // get the parameters from the URL:
  // var brightnessCommand = request.params.lightID + request.params.state;
  // console.log("received "+ brightnessCommand);

  // send it out the serial port:
  // myPort.write(brightnessCommand);
  // send the data and close the connection:
  // request.respond(brightnessCommand);
}