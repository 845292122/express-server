import { Router } from 'express'
import accountRouter from './account/account.router'
import permRouter from './perm/perm.router'
import authRouter from './auth/auth.router'
import { jwtAuth } from '../middleware'

const router = Router()

router.use('/auth', authRouter)
router.use('/account', jwtAuth, accountRouter)
router.use('/perm', jwtAuth, permRouter)

export default router
