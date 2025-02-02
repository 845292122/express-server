# airy-server

基于 express+prisma+mysql 的 nodejs 后端saas权限服务

## 权限业务

### 表结构

- 租户表
- 用户表
- 权限表

## 业务逻辑

1. 用户表tenant_id为空代表平台管理员(确保tenant_id有默认值，防止创建多余平台管理员账号)
2. 平台管理员来创建租户管理员账号并分配权限
3. 租户管理员来创建用户账号并分配权限(只能分配当前租户的权限)

## TODO

### 中间件整合

- [x] Multer - 官方推荐的文件上传中间件。
- [x] cors - 跨域资源共享。
- [x] morgan - HTTP 请求日志中间件。
- [x] pino - 官方推荐的日志中间件。
- [x] helmet - 最大程度的确保我们 API 的安全性，应用程序应对多种类型的攻击。
- [x] compression - 压缩和处理静态内容。
- [x] csurf - 先前为 express.csrf。
- [x] passport - 用于认证的 Express 中间件模块。
- [x] express-jwt - 产生唯一的基于用户信息token
- [x] express-rate-limit - 限流
- [x] 参数校验 - zod
- [x] 全局错误处理
- [x] prisma ORM
- [x] node-schedule - 定时任务

## git提交

- feat: 新增功能
- fix: 修复bug
- docs: 文档更新
- style: 代码格式化
- refactor: 重构代码
- chore: 构建过程或辅助工具的变动
