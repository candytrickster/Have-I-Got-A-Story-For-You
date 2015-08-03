var express = require('express'),
    jade = require('jade'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    index = require('./controllers/index_controller.js'),
    user = require('./controllers/user_controller.js'),
    User = require('mongoose').model('User'),
    story = require('./controllers/story_controller.js'),
    LocalStrategy = require('passport-local').Strategy;

var app = express();

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({
            username: username
        },
        function (err, user) {
        console.log("here");
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        }
    );
}));
passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

var session = require('express-session');
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'OurSuperSecretCookieSecret'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public'))); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', story.home);
app.get('/login', user.renderLogin);
app.post('/login', urlencodedParser, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
app.get('/register', user.renderRegister);
app.post('/register', urlencodedParser, user.register);
app.get('/story/:id', urlencodedParser, story.renderIndex);
app.get('/create', story.renderCreate);
app.post('/create', urlencodedParser, story.add_story);

app.get('/story/append/:id', urlencodedParser, story.renderAppend);
app.post('/story/append/:id', urlencodedParser, story.append);

app.get('/story/finish/:id', urlencodedParser, story.renderFinish);
app.post('/story/finish/:id', urlencodedParser, story.finish);
app.get('/logout', user.logout);

app.listen(3000);

//finsished