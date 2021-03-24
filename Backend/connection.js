var mongodb = require('mongodb');
module.exports = function(callback) {
    var MongoClient = mongodb.MongoClient;
    var url = 'mongodb://localhost:27017';
    MongoClient.connect(url, callback)
}