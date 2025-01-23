import passport, { DoneCallback } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { PrismaHelper } from '../helper/prisma.helper'
import bcrypt from 'bcryptjs'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Constant } from '../common/constant'

// * 本地策略 (登录时用)
passport.use(
  new LocalStrategy({ usernameField: 'phone', passwordField: 'password' }, async (phone, password, done) => {
    try {
      const account = await PrismaHelper.account.findFirst({
        where: { phone }
      })

      if (!account || !bcrypt.compareSync(password, account.password ?? '')) {
        return done(null, false, { message: '无效的手机号或密码' })
      }

      return done(null, account)
    } catch (err) {
      return done(err)
    }
  })
)

// JWT 策略配置
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Constant.Auth.JWT_SECRET
}

// * JWT 策略 (JWT 验证时用)
passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const account = await PrismaHelper.account.findUnique({ where: { id: payload.id } })
      if (!account) {
        return done(null, false)
      }
      return done(null, account)
    } catch (err) {
      return done(err, false)
    }
  })
)

// JWT 认证中间件
const jwtAuth = passport.authenticate('jwt', { session: false })

export { passport, jwtAuth }
