const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const userRouter = new Router({ prefix: '/users' })

userRouter.get('/', (ctx, next) => {
  // ctx.set('Access-Control-Allow-Origin', '*')
  console.log(ctx.header)
  const users = [
    {
      name: 'ice',
      age: 24,
    },
    {
      name: 'panda',
      age: 23,
    },
  ]

  ctx.body = users
})

app.use(userRouter.routes())
app.listen(3000, () => {
  console.log('服务启动成功')
})
