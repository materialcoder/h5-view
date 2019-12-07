const router = require('koa-router')()
const mongoose = require('mongoose')
const Page = require('../models/page')

// 访问预览页面
router.get('/view/:id', async ctx => {
  ctx.status = 201
  const page = {"shareConfig":{"coverImage":"","title":"这是#分享者#的大力推荐","description":"这是#分享者#大力推荐的H5"},"title":"未命名场景","coverImage":"","description":"我用夸克可视化编辑器做了一个超酷炫的H5，快来看看吧。","script":"","width":375,"height":644,"pageMode":"h5","flipType":2,"slideNumber":true,"status":1,"isPublish":false,"isTemplate":false,"members":[],"_id":"5ddd197559720973e87338de","pages":[{"uuid":"eb0c1cf3-d8a4-4a49-9ca5-86bc4644d779","name":"","elements":[{"uuid":"77d8a30f-9710-41e2-8b46-ac7f645ddbb7","elName":"h-text","animations":[],"commonStyle":{"position":"absolute","width":375,"height":40,"top":78,"left":6,"rotate":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"paddingBottom":0,"marginTop":0,"marginLeft":0,"marginRight":0,"marginBottom":0,"borderWidth":0,"borderColor":"","borderStyle":"solid","borderRadius":0,"boxShadow":"","fontSize":16,"fontWeight":500,"lineHeight":1.4,"letterSpacing":0,"textAlign":"center","color":"#000000","backgroundColor":"","backgroundImage":"","backgroundSize":"cover","opacity":1,"zIndex":1},"events":[],"propsValue":{"text":"这是一段文字"},"valueType":"String","isForm":false},{"uuid":"5940363f-5b79-4225-966c-9cf6d10dbcf5","elName":"qk-image","animations":[],"commonStyle":{"position":"absolute","width":375,"height":200,"top":124,"left":1,"rotate":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"paddingBottom":0,"marginTop":0,"marginLeft":0,"marginRight":0,"marginBottom":0,"borderWidth":0,"borderColor":"","borderStyle":"solid","borderRadius":0,"boxShadow":"","fontSize":16,"fontWeight":500,"lineHeight":1.4,"letterSpacing":0,"textAlign":"center","color":"#000000","backgroundColor":"","backgroundImage":"","backgroundSize":"cover","opacity":1,"zIndex":2},"events":[],"propsValue":{"imageSrc":"http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg"},"valueType":"String","isForm":false},{"uuid":"d213ba0d-66ad-4d56-9e4a-75c3812aba96","elName":"qk-button","animations":[],"commonStyle":{"position":"absolute","width":140,"height":40,"top":397,"left":94,"rotate":0,"paddingTop":10,"paddingLeft":0,"paddingRight":0,"paddingBottom":10,"marginTop":0,"marginLeft":0,"marginRight":0,"marginBottom":0,"borderWidth":1,"borderColor":"#999999","borderStyle":"solid","borderRadius":4,"boxShadow":"","fontSize":16,"fontWeight":500,"lineHeight":1.4,"letterSpacing":0,"textAlign":"center","color":"#000000","backgroundColor":"","backgroundImage":"","backgroundSize":"cover","opacity":1,"zIndex":3},"events":[],"propsValue":{"text":"按 钮"},"valueType":"String","isForm":false}],"commonStyle":{"backgroundColor":"","backgroundImage":"","backgroundSize":"cover"}},{"uuid":"c7df6249-2c45-4ac8-b51f-7a3039cac209","name":"","elements":[],"commonStyle":{"backgroundColor":"","backgroundImage":"","backgroundSize":"cover"}},{"uuid":"a87266ba-3f60-44b5-9fa5-7bfbe91b364b","name":"","elements":[{"uuid":"1fd0bd9c-5981-4fd4-9847-4285ca7b7d06","elName":"h-text","animations":[],"commonStyle":{"position":"absolute","width":375,"height":40,"top":88,"left":16,"rotate":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"paddingBottom":0,"marginTop":0,"marginLeft":0,"marginRight":0,"marginBottom":0,"borderWidth":0,"borderColor":"","borderStyle":"solid","borderRadius":0,"boxShadow":"","fontSize":16,"fontWeight":500,"lineHeight":1.4,"letterSpacing":0,"textAlign":"center","color":"#000000","backgroundColor":"","backgroundImage":"","backgroundSize":"cover","opacity":1,"zIndex":1},"events":[],"propsValue":{"text":"这是一段文字"},"valueType":"String","isForm":false},{"uuid":"38ef999a-3ed5-4873-b068-218305966d6e","elName":"qk-image","animations":[],"commonStyle":{"position":"absolute","width":375,"height":200,"top":134,"left":11,"rotate":0,"paddingTop":0,"paddingLeft":0,"paddingRight":0,"paddingBottom":0,"marginTop":0,"marginLeft":0,"marginRight":0,"marginBottom":0,"borderWidth":0,"borderColor":"","borderStyle":"solid","borderRadius":0,"boxShadow":"","fontSize":16,"fontWeight":500,"lineHeight":1.4,"letterSpacing":0,"textAlign":"center","color":"#000000","backgroundColor":"","backgroundImage":"","backgroundSize":"cover","opacity":1,"zIndex":2},"events":[],"propsValue":{"imageSrc":"http://seopic.699pic.com/photo/50051/4111.jpg_wh1200.jpg"},"valueType":"String","isForm":false},{"uuid":"07f79fd0-4b9d-4e3e-a424-2495291f4466","elName":"qk-button","animations":[],"commonStyle":{"position":"absolute","width":140,"height":40,"top":407,"left":104,"rotate":0,"paddingTop":10,"paddingLeft":0,"paddingRight":0,"paddingBottom":10,"marginTop":0,"marginLeft":0,"marginRight":0,"marginBottom":0,"borderWidth":1,"borderColor":"#999999","borderStyle":"solid","borderRadius":4,"boxShadow":"","fontSize":16,"fontWeight":500,"lineHeight":1.4,"letterSpacing":0,"textAlign":"center","color":"#000000","backgroundColor":"","backgroundImage":"","backgroundSize":"cover","opacity":1,"zIndex":3},"events":[],"propsValue":{"text":"按 钮"},"valueType":"String","isForm":false}],"commonStyle":{"backgroundColor":"","backgroundImage":"","backgroundSize":"cover"}}],"author":"5dd898721659195eb93b16dd","created":"2019-11-26T12:24:21.534Z","updated":"2019-11-27T06:10:49.374Z","__v":0}
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