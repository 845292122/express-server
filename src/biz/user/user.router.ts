import { Router } from 'express'
import { rateLimiter, validate, reply } from '../../middleware'
import { userInputSchema, userPageSchema } from './user.schema'
import userHandler from './user.handler'

const router = Router()

router.post('/create', rateLimiter(), validate(userInputSchema), reply(userHandler.create))
router.post('/modify', rateLimiter(), validate(userInputSchema), reply(userHandler.modify))
router.post('/remove/:id', rateLimiter(), reply(userHandler.remove))
router.get('/page', rateLimiter(), validate(userPageSchema), reply(userHandler.page))
router.get('/info/:id', rateLimiter(), reply(userHandler.info))

export default router
