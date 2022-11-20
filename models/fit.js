const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FitSchema = new Schema({
  name: {type: String, required: true, max: 50},
})

FitSchema.virtual('url').get(function() {
    return `/admin/fit/${this._id}`;
})

FitSchema.virtual('id').get(function() {
    return `${this._id}`;
})

module.exports = mongoose.model('Fit', FitSchema);