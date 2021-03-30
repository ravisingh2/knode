/*var conectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database:"schoolm"
});*/

var MongoClient = require('mongodb').MongoClient;
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