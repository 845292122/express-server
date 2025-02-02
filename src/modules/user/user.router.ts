import { Router } from 'express'
import { rateLimiter, validate } from '../../middleware'
import { userInputSchema, userPageSchema } from './user.schema'
import replyHelper from '../../helper/reply.helper'
import userHandler from './user.handler'

const router = Router()

router.post('/create', rateLimiter(), validate(userInputSchema), replyHelper(userHandler.create))
router.post('/modify', rateLimiter(), validate(userInputSchema), replyHelper(userHandler.modify))
router.post('/remove/:id', rateLimiter(), replyHelper(userHandler.remove))
router.get('/page', rateLimiter(), validate(userPageSchema), replyHelper(userHandler.page))
router.get('/info/:id', rateLimiter(), replyHelper(userHandler.info))

export default router
