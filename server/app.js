const Koa = require('koa')
const render = require('koa-ejs')
const router = require('koa-router')()
const path = require('path')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const formatresponse = require('./middleware/formatresponse')

const $config = require('../config')
const mongoConfig = require('./config/mongo')

// 加密参数
const SECRET = 'neil'

const app = new Koa()

// 配置静态web
app.use(koaStatic(__dirname + '/public'), { gzip: true, setHeader: function(res) {
  res.header('Access-Control-Allow-Origin', '*')
}})

// 跨域处理
app.use(cors())

// post 接口数据处理
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 3000*1024*1024  // 设置上传文件大小，最大限制30M
  }
}))

// 配置ejs-template 模板引擎(调用ctx.render()的时候，会制定到views目录下的HTML文件)
render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html',
  cache: false,
  debug: false
})

// 认证授权
app.use(koajwt({secret: SECRET}).unless({
  // 登录注册接口不需要验证
  path: [
    /^\/user\/login/,
    /^\/user\/register/
  ]
}))

// 设置全局变量
router.use(async (ctx, next) => {
  // token解密 将token里的用户信息赋值到全局变量中
  let token = ctx.header.authorization
  if (token && token !== 'undefined') {
    ctx.state.user = jsonwebtoken.verify(token.split(' ')[1], SECRET)
  }
  // 全局变量
  ctx.state.BASE_URL = $config.baseURL
  ctx.state.ROOT_PATH = path.join(__dirname, '../')
  ctx.state.SERVER_PATH = path.join(__dirname, '../')
  ctx.state.SECRET = SECRET
  await next()
})

// 链接数据库
mongoConfig.connect()

// 配置路由
fs.readdirSync(path.join(__dirname, './routes')).forEach(route => {
  console.log(route)
  let api = require(`./routes/${route}`)
  console.log(api.routes())
  router.use(`/${route.replace('.js', '')}`, api.routes())
})

// 格式化返回结果
app.use(formatresponse)

// 启动路由
app.use(router.routes())
app.use(router.allowedMethods())

// 启动服务
app.listen($config.port)

console.log('app server started!')