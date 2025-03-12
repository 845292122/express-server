import { Request } from 'express'
import { UserInputType, UserPageType } from './user.schema'
import { convertPageParam } from '../../utils/common.util'
import { PrismaUtil } from '../../utils/prisma.util'
import { BizError } from '../../common/error'
import bcrypt from 'bcryptjs'
import { Constant } from '../../common/constant'

export async function createUser(req: Request) {
  const userInfo: UserInputType = req.body

  const userExist = await PrismaUtil.user.findFirst({
    where: {
      delFlag: 0,
      phone: userInfo.phone,
      tenantID: userInfo.tenantID
    }
  })

  if (userExist) throw new BizError('用户名已存在')

  userInfo.password = bcrypt.hashSync(Constant.Auth.INIT_PWD)
  await PrismaUtil.user.create({
    data: userInfo
  })

  return
}

export async function modifyUser(req: Request) {
  const userInfo: UserInputType = req.body

  const userExist = await PrismaUtil.user.findFirst({
    where: {
      delFlag: 0,
      phone: userInfo.phone,
      tenantID: userInfo.tenantID,
      id: {
        not: userInfo.id
      }
    }
  })

  if (userExist) throw new BizError('用户名已存在')

  await PrismaUtil.user.update({
    where: {
      id: userInfo.id
    },
    data: userInfo
  })

  return
}

export async function removeUser(req: Request) {
  const id = Number(req.params.id)
  // TODO 校验用户是否在当前租户下
  await PrismaUtil.user.update({
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

export async function getUserPage(req: Request) {
  const { pageNo, pageSize, nickname, status } = req.query as unknown as UserPageType
  const pageParam = convertPageParam(pageNo, pageSize)
  const condition = {
    delFlag: 0,
    nickname: nickname ? { startsWith: nickname } : undefined,
    status: status ?? undefined
  }

  const [total, records] = await Promise.all([
    PrismaUtil.user.count({ where: condition }),
    PrismaUtil.user.findMany({
      where: condition,
      select: {
        id: true,
        nickname: true,
        email: true,
        phone: true,
        status: true,
        remark: true,
        isMaster: true
      },
      ...pageParam
    })
  ])

  return {
    total,
    records
  }
}

export async function getUserInfo(req: Request) {
  const id = Number(req.params.id)
  const userInfo = await PrismaUtil.user.findUnique({
    where: {
      delFlag: 0,
      id
    },
    select: {
      id: true,
      tenantID: true,
      nickname: true,
      phone: true,
      status: true,
      remark: true,
      isMaster: true
    }
  })
  return userInfo
}
