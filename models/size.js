const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SizeSchema = new Schema({
  name: {type: String, required: true, max: 10},
})

SizeSchema.virtual('url').get(function() {
    return `/admin/size/${this._id}`;
})

SizeSchema.virtual('id').get(function() {
    return `${this._id}`;
})

module.exports = mongoose.model('Size', SizeSchema);