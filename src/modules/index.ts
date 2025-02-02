import { Router } from 'express'
import { jwtAuth } from '../middleware'
import permRouter from './perm/perm.router'
import authRouter from './auth/auth.router'
import userRouter from './user/user.router'
import tenantRouter from './tenant/tenant.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/tenant', tenantRouter)
router.use('/user', userRouter)
router.use('/perm', jwtAuth, permRouter)

export default router
