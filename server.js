var express = require('express'),
    mongoose = require('mongoose'),
    settings = require('./modules/settings.js'),
    db = require('./modules/db.js');

//it overrides some mongoose function to be compatible with async module,
//because it requires the callback has two params err and data;
require('./modules/mongoose.js');

//this file coming from www.extsolutions.net generator
require('./modules/mongooseSchemaRequires.js');

//In schemaOverrides folder you should create overrides for each schemas to control
//the access. (check if user authenticated, ect.)
//require("fs").readdirSync("./schemaOverrides").forEach(function(file) {
//    require("./schemaOverrides/" + file);
//});

//You can change the url to your mongoDB in modules/settings.js
global.masterDB = db.connect(settings.masterDbConnection);
global.app = app = express.createServer();

app.configure(function() {
    app.use(express.logger());
    app.use(express["static"](__dirname + '/static'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res){
    res.redirect('app/index.html');
});

require('./services/dataservice.js');

app.listen(process.env['PORT'] || 3000, function() {
  console.log("Listening on " + 3000);
});
