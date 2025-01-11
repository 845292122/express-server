import { CorsOptions } from 'cors'

/**
 * * 跨域配置
 * origin: 允许的域名
 * methods: 允许的请求方式
 * allowedHeaders: 允许的请求头
 * credentials: 是否允许发送cookie
 */
export const corsOptions: CorsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}
