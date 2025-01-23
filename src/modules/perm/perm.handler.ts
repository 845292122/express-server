import { Request, Response } from 'express'
import { httpOk } from '../../app'
import { InputPermType, PagePermType } from './perm.schema'
import { convertPageParam, PrismaHelper } from '../../helper/prisma.helper'
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
  },

  page: async (req: Request, res: Response) => {
    const { pageNo, pageSize, name } = req.query as unknown as PagePermType
    const pageParam = convertPageParam(pageNo, pageSize)
    const condition = {
      delFlag: 0,
      name: name ?? undefined
    }

    const [total, records] = await Promise.all([
      PrismaHelper.perm.count({
        where: condition
      }),
      PrismaHelper.perm.findMany({
        where: condition,
        ...pageParam
      })
    ])

    httpOk(res, {
      total,
      records
    })
  },

  info: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const permInfo = await PrismaHelper.perm.findUnique({
      where: {
        id
      }
    })
    httpOk(res, permInfo)
  }
}
