
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.mongo.ObjectId

const schema = new Schema({
  _id: {type: ObjectId},
  url: {type: String, default: ''},
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
}, {timestamps: {createdAt: 'created'}})

const model = mongoose.model('image', schema, 'image')

module.exports = model