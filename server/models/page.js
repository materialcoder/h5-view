const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const schema = new Schema({
  _id: {type: ObjectId}, // 默认生成
  title: {type: String, default: '未命名场景'},
  coverImage: {type: String, default: ''},
  description: {type: String, default: '我使用H5-VIEW编辑器制作了一个炫酷的H5页面'},
  shareConfig: {
    shareWx: false,
    coverImage: {type: String, default: ''},
    title: {type: String, default: '这是#分享者#的大力推荐'},
    description: {type: String, default: '这是#分享者#的大力推荐'}
  },
  pages: Schema.Types.Mixed, // 用于原始数据存储
  script: {type: String, default: ''},  // 脚本插件
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'  // 关联user表
  },
  width: {type: Number, default: 375},  // 页面宽
  height: {type: Number, default: 611},  // 页面高
  pageMode: {type: String, default: 'h5'},  // 渲染模式
  flipType: {type: Number, default: 0},  // 翻页模式
  slideNumber: {type: Boolean, default: false},  // 翻页是否显示页面翻页指示
  add_time: Number,
  up_time: Number,
  status: {type: Number, enum: [0, 1], default: 1},  // 0 不允许访问， 1 允许访问
  isPublish: {type: Boolean, default: false},  // 是否发布
  isTemplate: {type: Boolean, default: false},  // 是否添加到模板
  members: [Schema.Types.ObjectId], // 共享人员列表
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})

const model = mongoose.model('page', schema, 'page')

module.exports = model