//Simple demo for World Weather Online using ajax/jquery/underscore

var express = require("express");
var SerialPort = require("serialport").SerialPort
var serialPort = new SerialPort("/dev/tty.usbmodemfd121", {baudrate: 9600, parser: require("serialport").parsers.readline('\n')}, false);

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

app.use("/", express.static("/Users/joshuapham/Documents/Web/universe"));

app.get("/", function(req, res){
	if(concentration)
	{
        res.sendfile("./index_concentration.html");
    }
    else
    {
    	res.sendfile("./index.html");
    }
});

app.listen(8000);
console.log("listening on port 8000");
