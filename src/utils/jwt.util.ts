import { Constant } from '../common/constant'
import jwt from 'jsonwebtoken'

export type JwtPayloadType = {
  id: number
  phone: string
  ip: string
}

export const JwtUtil = {
  generateToken: (user: any, ip: string) => {
    const payload: JwtPayloadType = { id: user.id, phone: user.phone, ip }
    // 单位: s
    const options = { expiresIn: 60 * 60 * 24 }
    return jwt.sign(payload, Constant.Auth.JWT_SECRET, options)
  }
}
