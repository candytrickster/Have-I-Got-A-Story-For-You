var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/data');

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

//the individual stories
exports.renderIndex = function(req, res) {
    Story.find({ id: req.params.id}, function (err, story) {
        if(err) return console.error(err);
        console.log('this is the id : '+req.params.id)
        res.render('story', {title: 'Story', stories: story});
});
};

exports.renderCreate = function(req, res) {
//    Story.findOneAndRemove({ title: 'The Woods' }, function(err, story) {
//    if (err) throw err;
//    console.log('Deleted story');
//});
    res.render('createStory');
};

//post for creating a story
exports.add_story = function(req, res) 
{
    var d = new Date();
    var new_story = new Story({id: d, title: req.body.title, content: req.body.content, finished: false}); 
    
    new_story.save(function (err, new_story) {
        if(err) return console.error(err)
        console.log('Story added')
    });
    console.log(req.body.title);
    res.render('success');
};




