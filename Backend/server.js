/**
 * Created by KarlisBumans on 28.04.2016.
 */
var express  = require('express');
                              // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
//var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
//var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

var user = require('./routes/userRoute');
var sport = require('./routes/sportRoutes');
var team = require('./routes/teamRoute');
var game = require('./routes/gameRoutes');
var nconf = require('nconf');
var methodOverride = require('method-override');

var app = express();

app.use('/',cors());

app.use('/api/user', cors());
app.use('/api/sport', cors());
app.use('/api/team', cors());
app.use('/api/game', cors());

app.use(bodyParser.urlencoded({extended:true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(methodOverride());
app.use('/api/user', user);
app.use('/api/sport', sport);
app.use('/api/team', team);
app.use('/api/game', game);
// configuration =================


//app.use(morgan('dev'));                                         // log every request to the console
//app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
//app.use(bodyParser.json());                                     // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080,'127.0.0.1');
console.log("App listening on port 8080");

mongoose.connect('mongodb://127.0.0.1:27017/LSIS');     // MongoDB Connection



