//Lets require/import the HTTP module
var HttpDispatcher = require('httpdispatcher');
var http = require('http');
var dispatcher = new HttpDispatcher();
var request = require('request');



//Lets define a port we want to listen to
//const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response) {
    //response.end('It Works!! Path Hit: ' + request.url);
    try {
        //log the request on console
        console.log(request.url);
        //console.log(request);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch (err) {
        console.log(err);
    }
}

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('/resources');
dispatcher.setStaticDirname('static');

dispatcher.setStatic('/Drum');
dispatcher.setStaticDirname('Drum');

dispatcher.setStatic('/hebCal');
dispatcher.setStaticDirname('hebCal');

//A sample GET request    
dispatcher.onGet("/drum", function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('jeremy Lavitt');
});

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    function endPost(a) {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(a);
    }
    request("http://www.hebcal.com/shabbat/?cfg=json&zip=07014&m=50", function(error, response, body) {
        var hebCal = JSON.parse(body);
        var time = hebCal.items[0].title.split(': ')[1];
        var jTime = "candleLighting :" + time;
        console.log(time);
        endPost(body);
    });


});

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});