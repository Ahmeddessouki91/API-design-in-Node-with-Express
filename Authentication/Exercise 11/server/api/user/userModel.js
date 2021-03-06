const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    // dont store the password as plain text
    password: {
        type: String,
        required: true
    }
});

// middleware that will run before a document
// is created
UserSchema.pre('save', function (next) {

    if (!this.isModified('password')) return next();
    this.password = this.encryptPassword(this.password);
    next();
});

// These methods are on the instance of the user returned by querying
// the database.
UserSchema.methods = {
    // check the passwords on signin
    authenticate: function (plainTextPword) {
        return bcrypt.compareSync(plainTextPword, this.password);
    },

    // hash the passwords
    encryptPassword: function (plainTextPword) {
        if (!plainTextPword) {
            return ''
        } else {
            const salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPword, salt);
        }
    }
};

module.exports = mongoose.model('user', UserSchema);
