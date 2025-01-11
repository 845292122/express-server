import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { csrfProtection, corsOptions, morganLogger } from './config'

const app = express()

/**
 * * 基础中间件
 * helmet: 安全中间件
 * cors: 跨域中间件
 * express.json(): 解析请求体中间件
 * cookieParser(): 解析cookie中间件
 * csrfProtection: csrf中间件
 * morganLogger: 日志中间件
 */
app.use(helmet())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(csrfProtection)
app.use(morganLogger)

app.listen(3000, () => {
  console.log(`express server is running`)
})

export default app
