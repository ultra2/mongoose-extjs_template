var mongoose = require('mongoose'),
    schemas = require('../modules/serverModelRequires.js');

exports.getGuid = function() {
    return String(mongoose.mongo.BSONPure.ObjectID.createPk());
};

exports.registerModels = function(connection) {
    connection.natCollections = [];
    for (var i = 0; connection.natModels.length > i; i++) {
        var m = connection.natModels[i];
        connection.model(m.name, m.schema, m.collection);
        connection.natCollections.push(m.collection);
    }
};

exports.connect = function(url) {
    var connection = mongoose.createConnection(url);
    connection.natModels = schemas.Models;
    exports.registerModels(connection);
    return connection;
};
