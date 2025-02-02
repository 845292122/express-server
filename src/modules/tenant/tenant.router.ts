import { Router } from 'express'
import { rateLimiter, validate } from '../../middleware'
import { tenantInputSchema } from './tenant.schema'
import replyHelper from '../../helper/reply.helper'
import tenantHandler from './tenant.handler'

const router = Router()

router.post('/create', rateLimiter(), validate(tenantInputSchema), replyHelper(tenantHandler.create))
router.post('/modify', rateLimiter(), validate(tenantInputSchema), replyHelper(tenantHandler.modify))
router.post('/remove/:id', rateLimiter(), replyHelper(tenantHandler.remove))
router.get('/page', rateLimiter(), replyHelper(tenantHandler.page))
router.get('/info/:id', rateLimiter(), replyHelper(tenantHandler.info))

export default router
