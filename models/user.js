const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true, max: 50, min: 1},
  password: {type: String, required: true, max: 50, min: 1},
  isAdmin: Boolean,
})

UserSchema.virtual('url').get(function() {
    return `/user/${this._id}`;
})

UserSchema.virtual('id').get(function() {
    return `${this._id}`;
})

module.exports = mongoose.model('User', UserSchema);