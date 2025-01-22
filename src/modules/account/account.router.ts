import { Router } from 'express'
import replyHelper from '../../helper/reply.helper'
import accountHandler from './account.handler'
import { validate, rateLimiter } from '../../middleware'
import { inputAccountSchema, pageAccountSchema } from './account.schema'

const router = Router()

// * 创建账户
router.post('/create', rateLimiter(), validate(inputAccountSchema), replyHelper(accountHandler.create))
// * 修改账户
router.post('/modify', rateLimiter(), validate(inputAccountSchema), replyHelper(accountHandler.modify))
// * 删除账户
router.post('/remove/:id', rateLimiter(), replyHelper(accountHandler.remove))
// * 获取分页账户列表
router.get('/page', rateLimiter(), validate(pageAccountSchema), replyHelper(accountHandler.page))

export default router
