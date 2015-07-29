var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.index = function(req, res) {
    res.render('story');
};

exports.create = function(req, res) {
    res.render('createStory');
};
