var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var solver = require('pokersolver');

const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const SUITS = ['c', 'd', 'h', 's'];
const RAKE = 0.01;

app.listen(3001, function(err) {
	console.log("server runnong at port 3001");
	if (err) {
		return console.error(err);
	}
});

// Initial Objects
var tables = {"0xf3beac30c498d9e26865f34fcaa57dbb935b0d74": {
					deck: '',
					handId: 0,
					lineup: [],
					biggestBet: 0,
					dealer: '',
					state: 'preflop',
					cards: []
				}
			};

var players = ['0xf3beac30c498d9e26865f34fcaa57dbb935b0d74','0xe10f3d125e5f4c753a6456fc37123cf17c6900f2', '0xc3ccb3902a164b83663947aff0284c6624f3fbf2', '0x82e8c6cf42c8d1ff9594b17a3f50e94a12cc860f'];

// poker related functions
var shuffle = function() {
	var array = [];
	for (var i = 0; i < 52; i++)
		array.push(i);
		for (i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * i);
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	return array;
}

var inLineup = function(lineup, player) {
  for (var i = 0; i < lineup.length; i++)
    if (lineup[i] && lineup[i].address == player)
      return true;
  return false;
}

var findMaxBet = function(lineup) {
	var max = 0;
	for (var i = 0; i < lineup.length; i++) {
		if (!lineup[i].last)
			continue;
   //  		var amount = EWT.parse(lineup[i].last).values[1];
			// max = (amount > max) ? amount : max;
	}
  return max;
}

var resolveHands = function(hands) { 
	let hand = solver.Hand;
	return hand.winners(hands);
}

// middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.json());
// REST Endpoints

// Get tablelist
app.get('/tables', (req, res) => {
	res.send(tables);
});

app.get('/tables/:tableId', (req, res) => {
	// getting table sample info
	let tableInfo = tables[req.params.tableId];
	res.send(tableInfo);
});

app.post('/tables/:tableId', (req, res) => {
	// join table
	console.dir(req);
	if (!req.body) { 
		res.status(400).send("Request cannot be empty");
	}
	
	let table = req.params.tableId;
	let seat = req.body.seatNo;
	let player;
	if (tables[table].lineup[req.body.seatNo]) { 
		res.send({ error: "Seat already taken"});
	} else {
		for (var i = 0; i < players.length; i++) {
			if (inLineup(tables[table].lineup, players[i])) { 
			continue;
			} else {
				player = { 
					address: players[i]
				};	
				tables[table].lineup[seat] = player;
				res.send({ seatedAt: i });
				break;
			}
		}	
	}
})

app.post('/tables/:tableId/pay', (req, res) => { 
	// do betting stuff here
	let player = req.player;
});

app.post('/show', (req, res) => { 
	let cards = req.params.cards; // array
	if (!cards || Object.prototype.toString.call(cards) !== '[object Array]' || cards.length !== 2)
		res.send('cards should be array of 2 cards');
});































