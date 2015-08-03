exports.renderHome = function(req, res) {
    console.log(req.user);
    res.render('index', {
    });
};