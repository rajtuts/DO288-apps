var restify = require('restify');

var controller = require('./controllers/items');
var serverinfo = require('./controllers/serverinfo');

var db = require('./models/db');
var model = require('./models/items');

model.connect(db.params, function(err) {
    if (err) throw err;
});

const server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
    
controller.context(server, '/todo/api', model); 
serverinfo.context(server, '/todo/api');

var port = process.env.PORT || 8080;
server.listen(port, function (err) {
    if (err)
        console.error(err);
    else
        console.log('App is ready at : ' + port);
});


/* 
process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
});
*/    

