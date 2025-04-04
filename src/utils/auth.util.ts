import { Request } from 'express'
import { JwtPayloadType } from './jwt.util'
import { BizError } from '../common/error'

export const AuthUtil = {
  getUserId: (req: Request) => {
    if (!req.user) throw new BizError('无效的token')
    return req.user && (req.user as JwtPayloadType)?.id
  }
}
