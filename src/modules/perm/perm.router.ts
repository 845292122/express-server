import { Router } from 'express'
import { rateLimiter, validate } from '../../middleware'
import { inputPermSchema } from './perm.schema'
import replyHelper from '../../helper/reply.helper'
import PermHandler from './perm.handler'

const router = Router()

// * 创建权限
router.post('/create', rateLimiter(), validate(inputPermSchema), replyHelper(PermHandler.create))

export default router
