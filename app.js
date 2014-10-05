//Simple demo for World Weather Online using ajax/jquery/underscore

var express = require("express");
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbmodem1421", {baudrate: 9600, parser: require("serialport").parsers.readline('\n')}, false);

var concentration = false;

serialPort.open(function (error) 
	{ 
		serialPort.on('data', function(data) 
			{ 
				if(String(data).indexOf("High") > -1)
				{
					console.log(concentration);
					concentration = true;
				}
				else
				{
					console.log(concentration);
					concentration = false;
				}
			});
	}
);

var app = express();

app.get("/", function(req, res){
        res.sendfile("./index.html");
});

app.listen(8000);
console.log("listening on port 8000");
