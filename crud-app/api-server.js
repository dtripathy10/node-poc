var restify = require('restify');
var fs = require('fs');
 
var mongoose = require('mongoose');

var models_path = process.cwd() + '/src/schema';

var url = 'mongodb://localhost:27017/my_database_name_ex';

mongoose.connect(url, {server:{auto_reconnect:true}});

var db = mongoose.connection;

db.on('error', function (err) {
    console.error('MongoDB connection error:', err);
});

db.once('open', function callback() {
    console.info('MongoDB connection is established');
});

db.on('disconnected', function() {
    console.error('MongoDB disconnected!');
    mongoose.connect(process.env.MONGO_URL, {server:{auto_reconnect:true}});
});

db.on('reconnected', function () {
    console.info('MongoDB reconnected!');
});


fs.readdirSync(models_path).forEach(function (file) {
    if (~file.indexOf('.js'))
        require(models_path + '/' + file)
});

var controllers = {};
var controllers_path = process.cwd() + '/src/api';

fs.readdirSync(controllers_path).forEach(function (file) {
    if (file.indexOf('.js') != -1) {
        controllers[file.split('.')[0]] = require(controllers_path + '/' + file)
    }
})
 
var server = restify.createServer();
 
server
    .use(restify.fullResponse())
    .use(restify.bodyParser());
 
// Article Start
server.post("/articles", controllers.Article.createArticle);
server.put("/articles/:id", controllers.Article.updateArticle);
server.del("/articles/:id", controllers.Article.deleteArticle);
server.get({path: "/articles/:id", version: "1.0.0"}, controllers.Article.viewArticle);
server.get({path: "/articles/:id", version: "2.0.0"}, controllers.Article.viewArticle_v2);
// Article End
 
// Comment Start
//server.post("/comments", controllers.Comment.createComment);
server.put("/comments/:id", controllers.Comment.viewComment);
server.del("/comments/:id", controllers.Comment.deleteComment);
server.get("/comments/:id", controllers.Comment.viewComment);
// Comment End
 
var port = process.env.PORT || 3000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
});
 
if (process.env.environment == 'production') {
    process.on('uncaughtException', function (err) {
        console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
    })
}