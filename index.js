var express = require('express');
var path = require('path');
var app = express();

app.listen(3000, function(err) {
	console.log("server runnong at port 3000");
    if (err) {
        return console.error(err);
    }
});

app.get('/info', function(req, res) {
    let tableInfo = {
        handId: 0,
        lineup: '',
        biggestBet: 0,
        dealer: '',
        state: 'preflop',
        cards: []
    }
    res.send(tableInfo);
});