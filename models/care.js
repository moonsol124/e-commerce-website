const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CareSchema = new Schema({
  name: {type: String, required: true, max: 50},
})

CareSchema.virtual('url').get(function() {
    return `/admin/care/${this._id}`;
})

CareSchema.virtual('id').get(function() {
    return `${this._id}`;
})

module.exports = mongoose.model('Care', CareSchema);