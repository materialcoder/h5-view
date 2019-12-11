// 上传图片
const path = require('path')
const fs = require('fs')

const uploadImage = ctx => {
  // 单个文件 获取上传文件
  const file = ctx.request.files.file
  // 时间戳
  let timestamps = (new Date().getTime()).toString()
  // 扩展名
  let extname = path.extname(file.name)
  // 判断文件夹是否存在 不存在则新建
  fs.existsSync(path.join(ctx.state.SERVER_PATH, 'public/upload_static/images')) || fs.mkdirSync(path.join(ctx.state.SERVER_PATH, 'public/upload_static/images'))
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  let filePath = path.join(ctx.state.SERVER_PATH, 'public/upload_static/images') + `/${timestamps}${extname}`
  // 创建可写流
  const upstream = fs.createWriteStream(filePath)
  // 图片地址
  let imageUrl = ctx.state.BASE_URL + '/upload_static/images/' + `${timestamps}${extname}`
  // 可读流通过管道写入可写流
  reader.pipe(upstream)
  return imageUrl
}

module.exports = uploadImage