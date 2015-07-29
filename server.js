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
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname + '/public'))); 

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', index.home);
app.get('/login', user.login);
app.get('/register', user.register);
app.get('/story', story.index);
app.get('/create', story.create);

app.listen(3000);