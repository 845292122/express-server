import morgan from 'morgan'
import logger from '../helper/logger.helper'

// 根据环境选择日志格式
// const skip = () => {
//   const env = process.env.NODE_ENV || 'development'
//   return env !== 'development'
// }

// 定义 morgan 中间件配置
export const morganLogger = morgan(
  '请求方式: :method 请求url: :url 请求状态: :status 请求地址: :remote-addr - 响应时间: :response-time ms 总处理时间: :total-time ms',
  {
    stream: {
      write: message => {
        const status = parseInt(message.split(' ')[2], 10) // 从日志中提取状态码
        if (status >= 500) {
          logger.error(`HTTP Error: ${message.trim()}`) // 错误级别日志
        } else {
          logger.info(message.trim()) // 普通信息日志
        }
      }
    }
  }
)
