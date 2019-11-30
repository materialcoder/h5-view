const router = require('koa-router')()
const Users = require('../models/user')
const mongoose = require('mongoose')
const jsonwebtoken = require('jsonwebtoken')

router.get('/list', async ctx => {
  ctx.body = {test: '11111'}
})

// 注册
router.post('/register', async ctx => {
  let data = ctx.request.body
  let result = await Users.findOne({username: data.username})
  console.log(result)
  if (result) {
    ctx.status = 202
    ctx.body = '该用户名已注册'
    return
  }
  let userData = await Users.create({
    ...data,
    _id: mongoose.mongo.ObjectId()
  })
  let userToken = {name: userData.username, _id: userData._id}
	ctx.body = {
		token: jsonwebtoken.sign(userToken, ctx.state.SECRET,  {expiresIn: '24h'})
	}
})

// 登录
router.post('/login', async ctx => {
  let data = ctx.request.body
  let result = await Users.findOne({username: data.username}).select('username password _id').exec()
  if (!result) {
    ctx.status = 202
    ctx.body = '该用户尚未注册，请先注册后再登陆！'
    return
  }
  if (result.password !== data.password) {
    ctx.status = 202
    ctx.body = '用户名或密码错误！'
    return
  }
  let userToken = {name: result.username, _id: result._id}
	ctx.body = {
		token: jsonwebtoken.sign(userToken, ctx.state.SECRET,  {expiresIn: '24h'})
	}
})

// 用户信息
router.get('/info', async ctx => {
  console.log(ctx.state.user)
  let _id = ctx.state.user._id
  ctx.body = await Users.findOne({_id}).select('username email avatar roles').exec()
})

module.exports = router