var db = require('../modules/db.js');

module.exports = exports = function commonPlugin (schema, options) {

    schema.pre('save', function (next) {
        this._id = this._id || db.getGuid();
        this.created = this.created || new Date();
        this.modified = new Date();
        this.version = this.version ? this.version + 1 : 0;
        this.deleted = this.deleted || false;
        next();
    });

    schema.statics.read = function read(req, res, callback) {
        var lastModified = new Date(req.query.lastModified);
        var me = this;
        me.find()
            .$gt('modified', lastModified)
            .exec(null, callback);
    };

    schema.statics.readOne = function readOne(req, res, callback) {
        var me = this;
        me.findOne({ _id: req.query.id }).exec(null, callback);
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
        this.deleted = true;
        this.save(callback);
    };
};
