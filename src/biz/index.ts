import { Router } from 'express'
// import { jwtAuth } from '../middleware'
import authRouter from './auth/auth.router'
import userRouter from './user/user.router'
import tenantRouter from './tenant/tenant.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/tenant', tenantRouter)
router.use('/user', userRouter)

export default router
