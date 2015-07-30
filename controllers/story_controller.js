var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



var StorySchema = new Schema({
    title: String,
    content: String,
});

mongoose.model('Stroy', StorySchema);

exports.index = function(req, res) {
    res.render('story');
};

exports.create = function(req, res) {
    res.render('createStory');
};
