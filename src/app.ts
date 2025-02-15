import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import multer from 'multer'
import compression from 'compression'
import { corsOptions, morganLogger } from './config'
import apiRouter from './biz'
import { NotFoundError } from './common/error'
import { errorHandler } from './middleware'
import logger from './helper/logger.helper'

// * 捕获同步异常
process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error)
})

// * 捕获未处理的 Promise 异常
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

const app = express()

// * 返回结果封装
export const httpOk = <T>(res: express.Response, data?: T) => {
  return res.status(200).json({
    msg: 'ok',
    data
  })
}

// 配置 Multer 存储引擎（这里使用内存存储）
export const upload = multer({ storage: multer.memoryStorage() })

/**
 * * 基础中间件
 * helmet: 安全中间件
 * cors: 跨域中间件
 * express.json(): 解析请求体中间件
 * cookieParser(): 解析cookie中间件
 * csrfProtection: csrf中间件
 * morganLogger: 日志中间件
 * compression: 压缩中间件
 */
app.use(helmet())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
// app.use(csrfProtection)
app.use(morganLogger)
app.use(
  compression({
    level: 6, // 压缩级别（0-9，默认是 -1）。数值越高，压缩率越高，但 CPU 占用越多
    threshold: 1024, // 只有响应体大于 1KB 才启用压缩（默认值）
    filter: (req, res) => {
      // 自定义压缩条件
      if (req.headers['x-no-compression']) {
        return false // 如果请求头包含 'x-no-compression'，不压缩
      }
      return compression.filter(req, res) // 否则使用默认过滤规则
    }
  })
)

// * 业务路由
app.use(apiRouter)

// * 捕获未处理的路由
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'))
})

// * 全局异常处理器
app.use(errorHandler)

app.listen(3000, () => {
  logger.info(`express server is running`)
})

export default app
