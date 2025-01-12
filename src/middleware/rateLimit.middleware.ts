import { rateLimit } from 'express-rate-limit'

const defaultOptions = {
  windowMs: 60 * 1000, // 时间窗口：1分钟
  limit: 100, // 每个 IP 的最大请求数
  message: {
    code: 429,
    message: '服务器正忙，请稍后再试.'
  },
  statusCode: 200,
  standardHeaders: true, // 返回标准的限流头部信息
  legacyHeaders: false // 禁用旧版限流头部信息
}

export const rateLimiter = (options = {}) => {
  const limiterOptions = { ...defaultOptions, ...options }
  return rateLimit(limiterOptions)
}
