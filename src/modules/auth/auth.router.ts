import { Request, Response, Router } from 'express'
import passport from 'passport'
import { jwtHelper } from '../../helper/jwt.helper'
import { httpOk } from '../../app'

const router = Router()

// * 登录 TODO: 待测试
router.post('/login', passport.authenticate('local', { session: false }), (req: Request, res: Response) => {
  const token = jwtHelper.generateToken(req.user)
  httpOk(res, { token })
})

export default router
