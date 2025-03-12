import { Request, Router } from 'express'
import passport from 'passport'
import { JwtUtil } from '../../utils/jwt.util'
import { validate, reply, jwtAuth } from '../../middleware'
import { authLoginSchema } from './auth.schema'
import { BizError } from '../../common/error'
import { getAuthInfo } from './auth.handler'

const router = Router()

// * 登录
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

router.get('/info', jwtAuth, reply(getAuthInfo))

export default router
