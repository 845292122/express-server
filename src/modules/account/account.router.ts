import { Router } from 'express'
import replyHelper from '../../helper/reply.helper'
import accountHandler from './account.handler'
import { validateMiddleware } from '../../middleware'
import { createAccountSchema } from './account.schema'

const router = Router()

router.get('/', validateMiddleware(createAccountSchema), replyHelper(accountHandler.create))

export default router
