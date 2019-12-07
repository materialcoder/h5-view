const router = require('koa-router')()
const mongoose = require('mongoose')
const Page = require('../models/page')

// 访问预览页面
router.get('/view/:_id', async ctx => {
  let _id = mongoose.mongo.ObjectId(ctx.params._id)
  const page = await Page.findOne({_id})
  ctx.status = 201
  let pageMode = {
    'h5': 'h5-swiper'
  }
  await ctx.render(pageMode[page.pageMode], {pageData: page})
})

// 创建页面
router.post('/add', async ctx => {
  let data = ctx.request.body
  let author = ctx.state.user._id
  ctx.body = await Page.create({
    ...data,
    author: author,
    _id: mongoose.mongo.ObjectId()
  })
})

// 保存页面数据
router.post('/update/:_id', async ctx => {
  let data = ctx.request.body
  let _id = mongoose.mongo.ObjectId(ctx.params._id)
  ctx.body = await Page.updateOne({_id}, {$set: data}, {
    runValidators: true
  })
})

// 查找某一页面数据
router.get('/detail/:_id', async ctx => {
  let _id = mongoose.mongo.ObjectId(ctx.params._id)
  ctx.body = await Page.findOne({_id})
})

// 获取所有pages
router.get('/myPages', async ctx => {
  let author = ctx.state.user._id
  author = mongoose.mongo.ObjectId(author)
  if (ctx.query.type === 'share') {
    ctx.body = await Page.find({pageMode: ctx.query.pageMode, isTemplate: {$ne: true}, members: {$elemMatch: {$in: author}}})
    return
  }
  ctx.body = await Page.find({pageMode: ctx.query.pageMode, author: author}).ne('isTemplate', true)
})

// 查询页面数量
router.get('/myPages/count', async ctx => {
  let author = ctx.state.user._id
  author = mongoose.mongo.ObjectId(author)
  let myList = await Page.find({pageMode: ctx.query.pageMode, author: author}).ne('isTemplate', true)
  let shareList = await Page.find({pageMode: ctx.query.pageMode, isTemplate: {$ne: true}, members: {$elemMatch: {$in: author}}})
  ctx.body = {
    my: myList.length,
    share: shareList.length
  }
})

// 删除一个页面
router.delete('/delete/:_id', async ctx => {
  let _id = mongoose.mongo.ObjectId(ctx.params._id)
  ctx.body = await Page.deleteOne({_id})
})

module.exports = router