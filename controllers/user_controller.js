var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/StoryTime');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){

});

var UserSchema = new Schema({
    email:String,
    username: String,
    password: String
});

var User = mongoose.model('User', UserSchema);

exports.renderLogin = function(req, res) {
    res.render('login');
};

exports.renderRegister = function(req, res) {
    res.render('register');
};

exports.register = function(req, res, next){
    var newUser = new User(req.body);
    console.log(req.body);
    newUser.save(function(err) {
        if(err) {
            return next(err);
        }
        else{
            res.redirect("/");
        }
    });
};


