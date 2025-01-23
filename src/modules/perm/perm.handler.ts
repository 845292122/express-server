import { Request, Response } from 'express'
import { httpOk } from '../../app'
import { InputPermType } from './perm.schema'
import { PrismaHelper } from '../../helper/prisma.helper'
import { BizError } from '../../common/error'

export default {
  create: async (req: Request, res: Response) => {
    const permInfo: InputPermType = req.body

    const permExist = await PrismaHelper.perm.findFirst({
      where: {
        key: permInfo.key,
        delFlag: 0
      }
    })

    if (permExist) throw new BizError('该权限已存在')

    await PrismaHelper.perm.create({
      data: permInfo
    })

    httpOk(res)
  },

  modify: async (req: Request, res: Response) => {
    const permInfo: InputPermType = req.body

    const permExist = await PrismaHelper.perm.findFirst({
      where: {
        key: permInfo.key,
        delFlag: 0,
        id: {
          not: permInfo.id
        }
      }
    })

    if (permExist) throw new BizError('该权限已存在')

    await PrismaHelper.perm.update({
      where: {
        id: permInfo.id
      },
      data: permInfo
    })

    httpOk(res)
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    await PrismaHelper.perm.update({
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
