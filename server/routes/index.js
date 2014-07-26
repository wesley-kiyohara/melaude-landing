module.exports = function(app) {
    require('./main.route')(app);
    require('./lead.route')(app);
}
