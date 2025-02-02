import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { PrismaHelper } from '../helper/prisma.helper'
import bcrypt from 'bcryptjs'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Constant } from '../common/constant'
import { BizError } from '../common/error'
import { Request } from 'express'

// * 本地策略 (登录时用)
passport.use(
  new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
    try {
      const user = await PrismaHelper.user.findFirst({
        where: {
          delFlag: 0,
          username
        }
      })

      if (!user || !bcrypt.compareSync(password, user.password ?? '')) {
        return done(new BizError('无效的用户名或密码'))
      }

      // TODO 用户状态判断

      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })
)

// * JWT 策略 (JWT 验证时用)
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Constant.Auth.JWT_SECRET,
      passReqToCallback: true
    },
    async (req: Request, payload, done) => {
      try {
        const user = await PrismaHelper.user.findUnique({ where: { delFlag: 0, id: payload.id } })
        if (!user) {
          return done(new BizError('无效的JWT～'))
        }
        // TODO 用户状态判断

        const ip = payload.ip
        if (ip !== req.ip) {
          return done(new BizError('无效的JWT～~'))
        }
        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

// JWT 认证中间件
const jwtAuth = passport.authenticate('jwt', { session: false })

export { passport, jwtAuth }
