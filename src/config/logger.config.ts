import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

const logStream = fs.createWriteStream(
  path.join(__dirname, '../../logs/access.log'),
  { flags: 'a' } // 'a' 表示追加写入
)

// 根据环境选择日志格式
// const skip = () => {
//   const env = process.env.NODE_ENV || 'development'
//   return env !== 'development'
// }

// 定义 morgan 中间件配置
export const morganLogger = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream: logStream
})
