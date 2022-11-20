const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  name: {type: String, required: true, max: 50},
})

MaterialSchema.virtual('url').get(function() {
    return `/admin/material/${this._id}`;
})

MaterialSchema.virtual('id').get(function() {
    return `${this._id}`;
})

module.exports = mongoose.model('Material', MaterialSchema);