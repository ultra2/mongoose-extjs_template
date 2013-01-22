var db = require('../modules/db.js');

module.exports = exports = function commonPlugin (schema, options) {

    schema.pre('save', function (next) {
        this._id = this._id || db.getGuid();
        this.created = this.created || new Date();
        this.modified = new Date();
        this.version = this.version ? this.version + 1 : 0;
        next();
    });

    schema.statics.read = function read(req, res, callback) {
        this.find().exec(null, callback);
    };

    schema.statics.create = function create(req, res, callback) {
        var obj = new this(req.body);
        obj.save(callback);
    };

    schema.methods.update = function update(req, res, callback) {
        this.set(req.body);
        this.save(callback);
    };

    schema.methods.destroy = function destroy(req, res, callback) {
        this.remove(callback);
    };
};
