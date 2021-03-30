/*var conectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database:"schoolm"
});*/

var MongoClient = require('mongodb').MongoClient;
global.db.connect('mongodb://127.0.0.1:27017/mohandojoro', function(err){
    if(err){
        console.log('unable to connect with mongo');
    }else{
        console.log('connect with mongo');
    }
});
var dbConnection = null;
var connect = function(url, done){
    MongoClient.connect(url, function(err, db) {
        if(err){
            console.log('could not connect with database');
        }else{
            dbConnection = db;
            done(err);
        }
    });
}
module.exports.connect = connect;

var getDbo = function() {
  return dbConnection;
}
module.exports.getDbo = getDbo;
module.exports.close = function(done) {
  if (dbConnection) {
    dbConnection.close(function(err, result) {
        dbConnection = null;
        dbConnection = null;
        done(err);
    });
  }
}        