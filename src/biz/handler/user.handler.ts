import { Request } from 'express'
import { AssignUserPermsType, UserInputType, UserPageType } from '../schema/user.schema'
import { convertPageParam } from '../../utils/common.util'
import { PrismaUtil } from '../../utils/prisma.util'
import { BizError } from '../../common/error'
import bcrypt from 'bcryptjs'
import { Constant } from '../../common/constant'
import { assignPerm, getPerms } from '../service/perm.service'

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
      isMaster: true,
      email: true
    }
  })
  return userInfo
}

export async function assignUserPerms(req: Request) {
  // TODO 租户只能设置自己拥有的权限
  const assignPermInfo: AssignUserPermsType = req.body
  await assignPerm(assignPermInfo.perms, assignPermInfo.id, Constant.OwnerType.USER)
  return
}

export async function getUserPerms(req: Request) {
  // TODO 租户只能获取自己拥有的权限
  const id = Number(req.params.id)
  return await getPerms(id, Constant.OwnerType.USER)
}
