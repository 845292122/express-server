import { Router } from 'express'
import replyHelper from '../../helper/reply.helper'
import accountHandler from './account.handler'
import { validate, rateLimiter } from '../../middleware'
import { inputAccountSchema } from './account.schema'

const router = Router()

// * 创建账户
router.post('/create', rateLimiter(), validate(inputAccountSchema), replyHelper(accountHandler.create))
// * 修改账户
router.post('/modify', rateLimiter(), validate(inputAccountSchema), replyHelper(accountHandler.modify))

export default router
