import { Request, Router } from 'express'
import passport from 'passport'
import { JwtUtil } from '../../utils/jwt.util'
import { validate, reply } from '../../middleware'
import { authLoginSchema } from './auth.schema'
import { BizError } from '../../common/error'

const router = Router()

// * 登录
// TODO: 待测试
router.post(
  '/login',
  validate(authLoginSchema),
  passport.authenticate('local', { session: false }),
  reply(async (req: Request) => {
    if (!req.ip) throw new BizError('无效的IP')
    const token = JwtUtil.generateToken(req.user, req.ip)
    return token
  })
)

export default router
