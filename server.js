var express = require('express'),
    jade = require('jade'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    index = require('./controllers/index_controller.js'),
    user = require('./controllers/user_controller.js'),
    story = require('./controllers/story_controller.js');

var app = express(); 

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public'))); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', story.home);
app.get('/login', user.renderLogin);
app.get('/register', user.renderRegister);
app.post('/register', urlencodedParser, user.register);
app.get('/story/:id', urlencodedParser, story.renderIndex);
app.get('/create', story.renderCreate);
app.post('/create', urlencodedParser, story.add_story);

//app.get('/append/:id', story.append);


app.listen(3000);