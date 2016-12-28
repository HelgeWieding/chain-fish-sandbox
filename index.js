var express = require('express');
var path = require('path');
var app = express();
var solver = require('pokersolver');

const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUITS = ['c', 'd', 'h', 's'];
const RAKE = 0.01;

app.listen(3000, function(err) {
	console.log("server runnong at port 3000");
    if (err) {
        return console.error(err);
    }
});

var tables = [{"0xf3beac30c498d9e26865f34fcaa57dbb935b0d74": {
                    info: {
                        
                    }
                }
            }];

// var shuffle = function() 
//     var array = [];
//     for (var i = 0; i < 52; i++)
//         array.push(i);
//         for (i = array.length - 1; i > 0; i--) {
//             var j = Math.floor(Math.random() * i);
//             var temp = array[i];
//             array[i] = array[j];
//             array[j] = temp;
//         }
//     return array;
// }

app.get('/tables', (req, res) => {
    res.send(tables);
});

app.get('/tables/:tableId', (req, res) => {
    // sample tableInfo
    console.log(req.params.tableId);
    // let tableInfo = {
    //     handId: 0,
    //     lineup: '',
    //     biggestBet: 0,
    //     dealer: '',
    //     state: 'preflop',
    //     cards: []
    // }

    res.send(req.params.tableId);
});

app.post('/tables/:tableId/join', (req, res) => {
    // join table
    let table = req.params.tableId;
    let seat = req.seat;
    let player = req.player;
    tables[table][seat] = player;
})

app.post('/tables/:tableId/bet', (req, res) => { 
    // do betting stuff here
    let player = req.player;
});

app.post('/show', (req, res) => { 
    let cards = req.params.cards; // array
    if (!cards || Object.prototype.toString.call(cards) !== '[object Array]' || cards.length !== 2)
        res.send('cards should be array of 2 cards');
});

var resolveHands = function(hands) { 
    let hand = solver.Hand;
    return hand.winners(hands);
}































