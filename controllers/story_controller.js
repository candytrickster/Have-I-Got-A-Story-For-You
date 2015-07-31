var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/data');

var story_id = 0;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    
});

var StorySchema = mongoose.Schema({
    id: String,
    title: String,
    content: String,
    finished: Boolean,
});

var Story = mongoose.model('Story', StorySchema);

//the home page with all the stories
exports.home = function(req, res) {
    Story.find(function (err, story) {
        if(err) return console.error(err);
        res.render('index', {title: 'Story list', stories: story});
});
};

//the individual stpries
exports.renderIndex = function(req, res) {
    Story.find({ id: req.params[0]}, function (err, story) {
        if(err) return console.error(err);
        console.log('this is the id : '+req.params[0])
        res.render('story', {title: 'Story', stories: story});
});
};


exports.renderCreate = function(req, res) {
    Story.findOneAndRemove({ title: 'asd' }, function(err, story) {
    if (err) throw err;
    console.log('Deleted story');
});
    res.render('createStory');
};


//post for creating a story
exports.add_story = function(req, res) 
{
    var new_story = new Story({id: story_id, title: req.body.title, content: req.body.content, finished: false}); 
    story_id++;
    new_story.save(function (err, new_story) {
        if(err) return console.error(err)
        console.log('Story added')
    });
    console.log(req.body.title);
    console.log(story_id);
    res.render('success');
};




