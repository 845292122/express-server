import accountRouter from './account.router'
import permRouter from './perm.router'
import { Router } from 'express'

const router = Router()

router.use('/account', accountRouter)
router.use('/perm', permRouter)

export default router
