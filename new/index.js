/******************************** SETUP ************************************/

//express and initializing the app
var express = require('express');
var app = express();

//session and body-parser for data persistence and post requests
var session = require('express-session');
var bodyParser = require('body-parser');

//http and requests for making outbound requests
var http = require('http').Server(app);
var request = require('request');

//using EJS as template engine
var engine = require('ejs-locals');
var fs = require('fs');

//adding support for post requests with body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Setting app's template engine to ejs
app.engine('ejs', engine);
app.set('view engine', 'ejs');

/*****************************************************************************/

/******************************** ROUTES *************************************/
app.get('/', function(req, res) {
	res.render('index', {});
});

app.get('/sendImage', clarifai, function(req, res) {
	if(res.clarifai_tags) {
	    console.log(req.headers);
	    res.render('main', {'err':'', 'body':res.clarifai_tags});
	    console.log(res.clarifai_probs);
	} else {

	    res.render('main', {'err':'true', 'body':''});
	}
});

/**************************** UTILITY ROUTES *********************************/

app.get('/location.js', function(req, res) {
	res.sendFile(__dirname + "/js/location.js");
});

app.get('/style.css', function(req, res) {
	res.sendFile(__dirname + "/css/style.css");
});

app.get('/img/Etsy-Handmade-Collage.jpg', function(req, res) {
	res.sendFile(__dirname + "/img/Etsy-Handmade-Collage.jpg");
});

app.get('/img/logo.png', function(req, res) {
	res.sendFile(__dirname + "/img/logo.png");
});

app.get('/index-js.js', function(req, res) {
	res.sendFile(__dirname + "/js/index-js.js");
});

/*****************************************************************************/

/************************* CLARIFAI API INTERACTION **************************/
function clarifai(req, res, next) {
	/*request.post('https://api.clarifai.com/v1/token/', 
		 {
		 	json: {
		 		grant_type: "client_credentials",
		 		client_id: '9h-MFmrhsHpweNgiUu9IftLvkqPKiep7LR__oq_i',
		 		client_secret: 'a8OcQDa6w-q9w9Z9NUi9HhW9vR02WPusCLAiTSrm'
		 	}
		 }*/
	var r = request({
		url: 'https://api.clarifai.com/v1/tag/',
		headers: {
		'Authorization' : 'Bearer q25KSLJDHKkOUZWwsq6fJJAWWpTLHO'
		},
		method: 'POST'

	},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var tags = JSON.parse(body).results[0].result.tag;
            res.clarifai_tags = tags.classes;
            res.clarifai_probs = tags.probs;
        }
        next();
        return;
    });

    var f = r.form();
    f.append('encoded_data', fs.createReadStream('/home/ananth/Pictures/propic.jpg'), {filename: 'upload.jpg'});
}

/*****************************************************************************/

http.listen(3000, function() {
	console.log('listening on *:3000');
});