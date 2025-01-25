import { Request, Response, Router } from 'express'
import passport from 'passport'
import { jwtHelper } from '../../helper/jwt.helper'
import { httpOk } from '../../app'
import { validate } from '../../middleware'
import { authLoginSchema } from './auth.schema'
import { BizError } from '../../common/error'

const router = Router()

// * 登录 TODO: 待测试
router.post(
  '/login',
  validate(authLoginSchema),
  passport.authenticate('local', { session: false }),
  (req: Request, res: Response) => {
    if (!req.ip) throw new BizError('无效的IP')
    const token = jwtHelper.generateToken(req.user, req.ip)
    httpOk(res, { token })
  }
)

export default router
