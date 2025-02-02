import { Constant } from '../common/constant'
import jwt from 'jsonwebtoken'

export const jwtHelper = {
  generateToken: (user: any, ip: string) => {
    const payload = { id: user.id, phone: user.phone, ip }
    // 单位: s
    const options = { expiresIn: 60 * 60 * 24 }
    return jwt.sign(payload, Constant.Auth.JWT_SECRET, options)
  }
}
