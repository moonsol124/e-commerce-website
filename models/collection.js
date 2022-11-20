const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  name: {type: String, required: true, max: 50},
  price: {type: Number, required: true},
  description: {type: String, required: true, max: 300},
  color: [{type: Schema.Types.ObjectId, required: true, ref: 'Color'}],
  size: [{type: Schema.Types.ObjectId, required: true, ref: 'Size'}],
  material: [{type: Schema.Types.ObjectId, ref: 'Material'}],
  fit: [{type: Schema.Types.ObjectId, ref: 'Fit'}],
  care: [{type: Schema.Types.ObjectId, ref: 'Care'}],
  gender: [{type: Schema.Types.ObjectId, ref: 'Gender', required: true}],
})
// product - name price description color size materials care fit reviews(possibly)

CollectionSchema.virtual('url').get(function() {
    return `/collection/${this._id}`;
})

CollectionSchema.virtual('id').get(function() {
    return `${this._id}`;
})

module.exports = mongoose.model('Collection', CollectionSchema);