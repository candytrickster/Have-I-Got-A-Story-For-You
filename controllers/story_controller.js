var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/data');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    
});

var StorySchema = new Schema({
    title: String,
    content: String,
});

var Story = mongoose.model('Story', StorySchema);

exports.home = function(req, res) {
    Story.find(function (err, story) {
        if(err) return console.error(err);
        res.render('index', {title: 'Story list', stories: story});
});
    res.render('index');
};

exports.index = function(req, res) {
    res.render('story');
};

exports.create = function(req, res) {
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


