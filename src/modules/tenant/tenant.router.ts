import { Router } from 'express'
import { rateLimiter, validate } from '../../middleware'
import { inputTenantSchema } from './tenant.schema'
import replyHelper from '../../helper/reply.helper'
import tenantHandler from './tenant.handler'

const router = Router()

router.post('/create', rateLimiter(), validate(inputTenantSchema), replyHelper(tenantHandler.create))
router.post('/modify', rateLimiter(), validate(inputTenantSchema), replyHelper(tenantHandler.modify))
router.post('/remove/:id', rateLimiter(), replyHelper(tenantHandler.remove))
router.get('/page', rateLimiter(), validate(inputTenantSchema), replyHelper(tenantHandler.page))
router.get('/info/:id', rateLimiter(), replyHelper(tenantHandler.info))

export default router
