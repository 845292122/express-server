import express from 'express'
import cors from 'cors'

const app = express()

/**
 * * 基础中间件
 * cors: 跨域中间件
 * express.json(): 解析请求体中间件
 */
app.use(cors())
app.use(express.json())

app.listen(3000, () => {
  console.log(`express server is running`)
})

export default app
