import { Router } from 'express'
import accountRouter from './account/account.router'
import permRouter from './perm/perm.router'

const router = Router()

router.use('/account', accountRouter)
router.use('/perm', permRouter)

export default router
