import { Router } from 'express'
import replyHelper from '../../helper/reply.helper'
import accountHandler from './account.handler'
import { validate, rateLimiter } from '../../middleware'
import { createAccountSchema } from './account.schema'

const router = Router()

// * 创建账户
router.post('/create', rateLimiter(), validate(createAccountSchema), replyHelper(accountHandler.create))

export default router
