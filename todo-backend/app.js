var restify = require('restify');
const restifyPlugins = require('restify-plugins');
var controller = require('./controllers/items');
var serverinfo = require('./controllers/serverinfo');

var db = require('./models/db');
var model = require('./models/items');

model.connect(db.params, function(err) {
    if (err) throw err;
});

//var server = restify.createServer() 
//    .use(restify.fullResponse())
//    .use(restify.queryParser())
//    .use(restify.bodyParser())
//    .use(restify.CORS());;
const server = restify.createServer({
  name: config.name,
  version: config.version,
});

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());
    
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

