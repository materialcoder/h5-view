module.exports = async (ctx, next) => {
  await next().then(() => {
    if (ctx.status === 200) {
      ctx.body = {
        code: 200,
        status: true,
        body: ctx.body,
        msg: '成功'
      }
    } else if(ctx.status === 201) {
      // 处理模板引擎渲染
    } else {
      ctx.body = {
        code: ctx.status,
        status: false,
        body: ctx.body,
        msg: ctx.body || '接口异常，请重试'
      }
    }
  }).catch((err) => {
    throw err
  })
}