import { Router } from 'express'
import { rateLimiter, validate } from '../../middleware'
import { inputPermSchema, pagePermSchema } from './perm.schema'
import replyHelper from '../../helper/reply.helper'
import PermHandler from './perm.handler'

const router = Router()

// * 创建权限
router.post('/create', rateLimiter(), validate(inputPermSchema), replyHelper(PermHandler.create))
// * 修改权限
router.post('/modify', rateLimiter(), validate(inputPermSchema), replyHelper(PermHandler.modify))
// * 删除权限
router.post('/remove', rateLimiter(), replyHelper(PermHandler.remove))
// * 获取权限列表
router.get('/list', rateLimiter(), validate(pagePermSchema), replyHelper(PermHandler.page))
// * 获取权限详情
router.get('/info', rateLimiter(), replyHelper(PermHandler.info))

export default router
