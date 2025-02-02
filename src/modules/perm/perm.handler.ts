import { Request, Response } from 'express'
import { httpOk } from '../../app'
import { PrismaHelper } from '../../helper/prisma.helper'
import { BizError } from '../../common/error'
import { PermInputType, PermListType } from './perm.schema'

const create = async (req: Request, res: Response) => {
  const permInfo: PermInputType = req.body

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
}

const modify = async (req: Request, res: Response) => {
  const permInfo: PermInputType = req.body

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
}

const remove = async (req: Request, res: Response) => {
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

const list = async (req: Request, res: Response) => {
  const { name, status } = req.query as unknown as PermListType
  const condition = {
    delFlag: 0,
    name: name ? { startsWith: name } : undefined,
    status: status ?? undefined
  }

  const records = await PrismaHelper.perm.findMany({
    where: condition
  })

  httpOk(res, records)
}

const info = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const permInfo = await PrismaHelper.perm.findUnique({
    where: {
      id
    }
  })
  httpOk(res, permInfo)
}

export default {
  create,
  modify,
  remove,
  list,
  info
}
