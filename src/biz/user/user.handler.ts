import { Request } from 'express'
import { UserInputType, UserPageType } from './user.schema'
import { convertPageParam, PrismaHelper } from '../../helper/prisma.helper'
import { BizError } from '../../common/error'
import bcrypt from 'bcryptjs'
import { Constant } from '../../common/constant'

const create = async (req: Request) => {
  const userInfo: UserInputType = req.body

  const userExist = await PrismaHelper.user.findFirst({
    where: {
      delFlag: 0,
      username: userInfo.username,
      tenantID: userInfo.tenantID
    }
  })

  if (userExist) throw new BizError('用户名已存在')

  userInfo.password = bcrypt.hashSync(Constant.Auth.INIT_PWD)
  await PrismaHelper.user.create({
    data: userInfo
  })

  return
}

const modify = async (req: Request) => {
  const userInfo: UserInputType = req.body

  const userExist = await PrismaHelper.user.findFirst({
    where: {
      delFlag: 0,
      username: userInfo.username,
      tenantID: userInfo.tenantID,
      id: {
        not: userInfo.id
      }
    }
  })

  if (userExist) throw new BizError('用户名已存在')

  await PrismaHelper.user.update({
    where: {
      id: userInfo.id
    },
    data: userInfo
  })

  return
}

const remove = async (req: Request) => {
  const id = Number(req.params.id)
  // TODO 校验用户是否在当前租户下
  await PrismaHelper.user.update({
    where: {
      delFlag: 0,
      id
    },
    data: {
      delFlag: 1
    }
  })
  return
}

const page = async (req: Request) => {
  const { pageNo, pageSize, nickname, status } = req.query as unknown as UserPageType
  const pageParam = convertPageParam(pageNo, pageSize)
  const condition = {
    delFlag: 0,
    nickname: nickname ? { startsWith: nickname } : undefined,
    status: status ?? undefined
  }

  const [total, records] = await Promise.all([
    PrismaHelper.user.count({ where: condition }),
    PrismaHelper.user.findMany({
      where: condition,
      select: {
        id: true,
        username: true,
        nickname: true,
        phone: true,
        status: true,
        remark: true
      },
      ...pageParam
    })
  ])

  return {
    total,
    records
  }
}

const info = async (req: Request) => {
  const id = Number(req.params.id)
  const userInfo = await PrismaHelper.user.findUnique({
    where: {
      delFlag: 0,
      id
    },
    select: {
      id: true,
      username: true,
      nickname: true,
      phone: true,
      status: true,
      remark: true
    }
  })
  return userInfo
}

export default {
  create,
  modify,
  remove,
  page,
  info
}
