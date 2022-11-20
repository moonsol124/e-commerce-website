const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GenderSchema = new Schema({
  name: {type: String, required: true, max: 10},
})

GenderSchema.virtual('url').get(function() {
    return `/admin/gender/${this._id}`;
})

GenderSchema.virtual('id').get(function() {
    return `${this._id}`;
})

module.exports = mongoose.model('Gender', GenderSchema);