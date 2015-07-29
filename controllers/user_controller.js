var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

exports.login = function(req, res) {
    res.render('login');
};

exports.signup = function(req, res) {
    res.render('create');
};