exports.renderHome = function(req, res) {
    res.render('index', {
        user: req.user ? req.user.username : ''
    });
};