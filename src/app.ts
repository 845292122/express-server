import express from 'express'

const app = express()

app.use('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(123)
  await next()
  console.log(456)
  res.send('Hello World!')
})

app.use(async () => {
  console.log('abc')
})

app.listen(3000, () => {
  console.log(`express server is running`)
})

export default app
