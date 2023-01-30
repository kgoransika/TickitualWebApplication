var mclient = require('mongodb').MongoClient;
var dburl = 'mongodb+srv://ransika5080:zGobApVUgAug1tNF@cluster0.7xa1nf3.mongodb.net/tickitualDb/?retryWrites=true&w=majority/';

module.exports.connect = function connect(callback) {
    mclient.connect(dburl, function(err, conn){
        /* exports the connection */
        module.exports.db = conn;
        callback(err);
    });
};