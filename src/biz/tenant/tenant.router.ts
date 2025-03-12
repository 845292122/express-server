import { Router } from 'express'
import { rateLimiter, validate, reply } from '../../middleware'
import { tenantInputSchema, tenantPageSchema } from './tenant.schema'
import { createTenant, modifyTenant, removeTenant, getTenantInfo, getTenantList, getTenantPage } from './tenant.handler'

const router = Router()

router.post('/create', rateLimiter(), validate(tenantInputSchema), reply(createTenant))
router.post('/modify', rateLimiter(), validate(tenantInputSchema), reply(modifyTenant))
router.post('/remove/:id', rateLimiter(), reply(removeTenant))
router.get('/page', rateLimiter(), validate(tenantPageSchema), reply(getTenantPage))
router.get('/info/:id', rateLimiter(), reply(getTenantInfo))
router.get('/list', rateLimiter(), reply(getTenantList))

export default router
