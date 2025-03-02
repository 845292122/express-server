import { Router } from 'express'
import { rateLimiter, validate, reply } from '../../middleware'
import { tenantInputSchema, tenantPageSchema } from './tenant.schema'
import tenantHandler from './tenant.handler'

const router = Router()

router.post('/create', rateLimiter(), validate(tenantInputSchema), reply(tenantHandler.create))
router.post('/modify', rateLimiter(), validate(tenantInputSchema), reply(tenantHandler.modify))
router.post('/remove/:id', rateLimiter(), reply(tenantHandler.remove))
router.get('/page', rateLimiter(), validate(tenantPageSchema), reply(tenantHandler.page))
router.get('/info/:id', rateLimiter(), reply(tenantHandler.info))

export default router
