const Image = require('../models/image')
const router = require('koa-router')()
const mongoose = require('mongoose')

const uploadImage = require('../utils/uploadImage')

// 上传图片
router.post('/uploadImage', async ctx => {
  let imageUrl = uploadImage(ctx)
  console.log(imageUrl)
  // 记录用户上传的图片
  let author = ctx.state.user._id
  return ctx.body = await Image.create({
    url: imageUrl,
    author: author,
    _id: mongoose.mongo.ObjectId()
  })
})

// 上传文件 不用存储路径到数据库
router.post('/uploadFile', async ctx => {
  let imageUrl = uploadImage(ctx)
  ctx.body = imageUrl
})

module.exports = router