import { Request, Response } from 'express'
import { httpOk } from '../../app'
import { AccountType } from './account'
import { PrismaHelper } from '../../helper/prisma.helper'
import { BizError } from '../../common/error'
import bcrypt from 'bcryptjs'
import { Constant } from '../../common/constant'

export default {
  create: async (req: Request, res: Response) => {
    const accountInfo: AccountType = req.body

    const accountExist = await PrismaHelper.account.findFirst({
      where: {
        phone: accountInfo.phone,
        delFlag: 0
      }
    })

    if (accountExist) throw new BizError('该手机号已存在')

    accountInfo.password = bcrypt.hashSync(Constant.Auth.INIT_PWD, 10)
    await PrismaHelper.account.create({
      data: accountInfo
    })

    httpOk(res)
  },

  modify: async (req: Request, res: Response) => {
    const accountInfo: AccountType = req.body

    const accountExist = await PrismaHelper.account.findFirst({
      where: {
        phone: accountInfo.phone,
        delFlag: 0,
        id: {
          not: accountInfo.id
        }
      }
    })

    if (accountExist) throw new BizError('该手机号已存在')

    await PrismaHelper.account.update({
      where: {
        id: accountInfo.id
      },
      data: accountInfo
    })

    httpOk(res)
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await PrismaHelper.account.update({
      where: {
        id,
        delFlag: 0
      },
      data: {
        delFlag: 1
      }
    })
    httpOk(res)
  }
}
