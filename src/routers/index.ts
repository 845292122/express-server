import { Router } from 'express'
import accountRouter from './account.router'
import permRouter from './perm.router'

const router = Router()

router.use('/account', accountRouter)
router.use('/perm', permRouter)

export default router
