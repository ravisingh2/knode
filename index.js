/*const cluster = require('cluster');
//const http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    var worker = cluster.fork();
    console.log(worker.id);
  }

  cluster.on('exit', function(worker) {
      console.log(worker.process.id)
      cluster.fork();
  });
} else {*/
var express = require('express');
//var mongoDb = require('mongodb').MongoClient;
//global.db = require('./db/db');
/*global.db.connect('mongodb://127.0.0.1:27017/mohandojoro', function(err){
    if(err){
        console.log('unable to connect with mongo');
    }else{
        console.log('connect with mongo');
    }
});*/
var session = require('express-session');
var path = require('path');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();
global.secret_key = 'hireapplicant@api';
global.urlencode = require('urlencode');
constant = require('./constant');
app.use(session({'secret':'secure@api',
    proxy: true,
    resave: true,
    saveUninitialized: true}));
app.set('views', path.join(__dirname+'/views'));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
var sess = {};
//require('./router')(app);
//app.use(express.static('public')):
// app.get('/', function(req, res){	  

// }); 
app.get('/favicon.ico', function(req, res){
	res.send(200);
});
 app.get('/:controllerName/:method', function(req, res){
	var controller = require('./router/controller/'+req.params.controllerName+".js");	
	var methodName = req.params.method;
        console.log(typeof eval("controller."+methodName));
        if(typeof eval("controller."+methodName)== 'undefined'){
            var error = {};
            error.status = false;
            error.msg = 'No Method found';            
           res.send(error);
        }else{
            eval("controller."+methodName)(req, res);
        }
		
}); 

app.listen(3001);
