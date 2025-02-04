import { Router } from 'express'
import { rateLimiter, validate } from '../../middleware'
import replyHelper from '../../helper/reply.helper'
import PermHandler from './perm.handler'
import { permInputSchema, permListSchema } from './perm.schema'

const router = Router()

// * 创建权限
router.post('/create', rateLimiter(), validate(permInputSchema), replyHelper(PermHandler.create))
// * 修改权限
router.post('/modify', rateLimiter(), validate(permInputSchema), replyHelper(PermHandler.modify))
// * 删除权限
router.post('/remove/:id', rateLimiter(), replyHelper(PermHandler.remove))
// * 获取权限列表
router.get('/list', rateLimiter(), validate(permListSchema), replyHelper(PermHandler.list))
// * 获取权限详情
router.get('/info/:id', rateLimiter(), replyHelper(PermHandler.info))

export default router
