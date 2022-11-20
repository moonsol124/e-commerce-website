const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema({
  name: {type: String, required: true, max: 15},
  rgbValue: {type: String, required: true, max: 20},
})

ColorSchema.virtual('url').get(function() {
    return `/admin/color/${this._id}`;
})

ColorSchema.virtual('id').get(function() {
    return `${this._id}`;
})

module.exports = mongoose.model('Color', ColorSchema);