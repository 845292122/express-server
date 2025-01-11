# airy-server

基于 express+prisma+mysql 的 nodejs 后端服务

## TODO

### 中间件整合

- [x] Multer - 官方推荐的文件上传中间件。
- [x] cors - 跨域资源共享。
- [x] morgan - HTTP 请求日志中间件。
- [x] pino - 官方推荐的日志中间件。
- [x] helmet - 最大程度的确保我们 API 的安全性，应用程序应对多种类型的攻击。
- [ ] compression - 压缩和处理静态内容。
- [x] csurf - 先前为 express.csrf。
- [ ] passport - 用于认证的 Express 中间件模块。
- [ ] express-jwt - 产生唯一的基于用户信息token
- [ ] 限流
- [ ] 参数校验
- [ ] 全局错误处理
- [ ] prisma ORM

## git提交

- feat: 新增功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式化
- refactor: 重构代码
- chore: 构建过程或辅助工具的变动
