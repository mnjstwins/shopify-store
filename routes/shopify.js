var express = require('express');
var request = require('request');
var router = express.Router();

var API_KEY = '1f9470a9f352d9f7d9c6f074cef97521';
var PASSWD = 'b620e0b5618f9045f1ead2dff07d0d5e';
var STORE_NAME = 'Vanessa\'s Stich Labs Store';

router.get('/get', function(req, res) {

	var path = req.query.path;

	res.set({'Content-Type': 'application/json'});

	request('https://' + API_KEY + ':' + PASSWD + '@' + STORE_NAME + '.myshopify.com' + path
		, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.status(200).send(body);
			}
		}
	);
});

router.post('/post', function(req, res){

	var path = req.query.path
		, requestData = req.body
		;

	console.log(requestData);

	request({
		url: 'https://' + API_KEY + ':' + PASSWD + '@' + STORE_NAME + '.myshopify.com' + path
		, method: "POST"
		, json: true
		, headers: {
			"content-type": "application/json"
		}
		, body: JSON.stringify(requestData)
	}
	, function (error, response, body) {

			console.log(response.statusCode);

			if (!error && response.statusCode === 200 || response.statusCode === 201) {
				res.status(200).send(body);
			} else {
				console.log(error);
				//console.log(response);
				res.status(500).send(body);
			}
	});
});

module.exports = router;
