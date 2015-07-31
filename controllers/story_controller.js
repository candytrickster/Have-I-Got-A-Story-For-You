var mongoose = require('mongoose'),
    crypto = require('crypto');


mongoose.connect('mongodb://localhost/data');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    
});

var StorySchema = mongoose.Schema({
    title: String,
    content: String,
});

var Story = mongoose.model('Story', StorySchema);

exports.home = function(req, res) {
    Story.find(function (err, story) {
        if(err) return console.error(err);
        res.render('index', {title: 'Story list', stories: story});
});
};

exports.renderIndex = function(req, res) {
    res.render('story');
};

exports.renderCreate = function(req, res) {
    res.render('createStory');
};

exports.add_story = function(req, res) 
{
    var new_story = new Story({title: req.body.title, content: req.body.content}); 
    
    new_story.save(function (err, new_story) {
        if(err) return console.error(err)
        console.log('Story added')
    });
    console.log(req.body.title);
    console.log(req.body.content);
    res.render('success');
};


