import { Router } from 'express'
// import { jwtAuth } from '../middleware'
import authRouter from './router/auth.router'
import userRouter from './router/user.router'
import tenantRouter from './router/tenant.router'

const router = Router()

router.use('/auth', authRouter)
router.use('/tenant', tenantRouter)
router.use('/user', userRouter)

export default router
