import { Router } from 'express'
import { rateLimiter, validate } from '../../middleware'
import { inputPermSchema } from './perm.schema'
import replyHelper from '../../helper/reply.helper'
import PermHandler from './perm.handler'

const router = Router()

// * 创建权限
router.post('/create', rateLimiter(), validate(inputPermSchema), replyHelper(PermHandler.create))
// * 修改权限
router.post('/modify', rateLimiter(), validate(inputPermSchema), replyHelper(PermHandler.modify))
// * 删除权限
router.post('/remove', rateLimiter(), replyHelper(PermHandler.remove))

export default router
