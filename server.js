var express = require('express'),
    jade = require('jade'),
    path = require('path');

var app = express(); 

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname + '/public'))); 

//home
app.get('/', function (req, res) {
    res.render('index');
});

//login screen
app.get('/login', function (req, res) {
    res.render('login');
});

//sign up screen
app.get('/signup', function (req, res) {
    res.render('create');
});

//view a clicked story
app.get('/story', function (req, res) {
    res.render('story');
});

//create a new story
app.get('/create', function (req, res) {
    res.render('createStory');
});


app.listen(3000);