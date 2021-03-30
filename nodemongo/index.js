var express = require('express');
//var mysql = require('mysql');
var mongoDb = require('mongodb').MongoClient;
global.db = require('./db/db');
global.db.connect('mongodb://127.0.0.1:27017/mohandojoro', function(err){
    if(err){
        console.log('unable to connect with mongo');
    }else{
        console.log('connect with mongo');
    }
});
var session = require('express-session');
var path = require('path');
var fs = require('fs');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();
app.use(session({'secret':'sssd',
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
var ses = {};
require('./router')(app);
//app.use(express.static('public')):
/* var conectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password:ABDEFGHIJKLNOPQRSTUWYaaaBB
  database:"schoolm"
}); */
// app.get('/', function(req, res){	  
	// conectionPool.getConnection(function(err, connection){
	  // if(err){
		// console.log(err);
		// return;
	  // }
	  // connection.query('select * from sh_system_user', function(err, rows){
	  // if(err){
		// console.log(err)
	  // }
		// res.send({
			// 'data':rows
			// });
		// connection.release();		
	  // });
	// });
// }); 
 /*app.get('/:controllerName', function(req, res){
    if(req.params.controllerName != 'favicon.ico') {
            var controller = require('./router/controller/'+req.params.controllerName+".js");	
            res.send({data:controller.index(req)});
    }
		
});*/ 

app.listen(3000);