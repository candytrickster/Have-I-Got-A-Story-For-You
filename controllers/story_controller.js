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
exports.home = function (req, res) {
    Story.find(function (err, story) {
        if (err) return console.error(err);
        res.render('index', {
            title: 'Story list',
            stories: story,
            user: req.user ? req.user.username : ''
        });
    });
};

//the individual stories
exports.renderIndex = function(req, res) {
    Story.find({ id: req.params.id}, function (err, story) {
        if(err) return console.error(err);
        console.log('this is the id : '+req.params.id)
        res.render('story', {title: 'Story', stories: story, user: req.user ? req.user.username : ''});
});
};

exports.renderCreate = function(req, res) {
//    Story.findOneAndRemove({ title: 'The Woods' }, function(err, story) {
//    if (err) throw err;
//    console.log('Deleted story');
//});
    res.render('createStory', {user: req.user ? req.user.username : ''});
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
    res.render('success', {user: req.user ? req.user.username : ''});
};


exports.renderAppend = function(req,res)
{
    Story.find({ id: req.params.id}, function (err, story) {
        if(err) return console.error(err);
        console.log('this is the id : '+req.params.id)
        res.render('append_form', {title: 'Story', stories: story, user: req.user ? req.user.username : ''});
});
};


exports.append = function(req,res)
{
    Story.findOne({id: req.params.id}, function(err, story) {
        if (err) return console.error(err);
        new_story = story.content + ' ' + req.body.new_content;
        story.content = new_story;

        story.save(function (err, story) {
            if (err) return console.error(err);
            console.log('story updated');
        });
    });
    res.render('success', {user: req.user ? req.user.username : ''});
};


exports.renderFinish = function(req,res)
{
    Story.find({ id: req.params.id}, function (err, story) {
        if(err) return console.error(err);
        console.log('this is the id : '+req.params.id)
        res.render('finish_form', {title: 'Story', stories: story, user: req.user ? req.user.username : ''});
});
};


exports.finish = function(req,res)
{
    Story.findOne({id: req.params.id}, function(err, story) {
        if (err) return console.error(err);
        new_story = story.content + ' ' + req.body.new_content;
        story.content = new_story;
        story.finished = true;

        story.save(function (err, story) {
            if (err) return console.error(err);
            console.log('story updated');
        });
    });
    res.render('success', {user: req.user ? req.user.username : ''});
};





















