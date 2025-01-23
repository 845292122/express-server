import { Constant } from '../common/constant'
import { InputAccountType } from '../modules/account/account.schema'
import jwt from 'jsonwebtoken'

export const jwtHelper = {
  generateToken: (account: any) => {
    const payload = { id: account.id, phone: account.phone }
    // 单位: s
    const options = { expiresIn: 60 * 60 * 24 }
    return jwt.sign(payload, Constant.Auth.JWT_SECRET, options)
  }
}
