import { Router } from 'express'
import { rateLimiter, validate, reply } from '../../middleware'
import { userInputSchema, userPageSchema } from '../schema/user.schema'
import { createUser, modifyUser, removeUser, getUserPage, getUserInfo } from '../handler/user.handler'

const router = Router()

router.post('/create', rateLimiter(), validate(userInputSchema), reply(createUser))
router.post('/modify', rateLimiter(), validate(userInputSchema), reply(modifyUser))
router.post('/remove/:id', rateLimiter(), reply(removeUser))
router.get('/page', rateLimiter(), validate(userPageSchema), reply(getUserPage))
router.get('/info/:id', rateLimiter(), reply(getUserInfo))

export default router
