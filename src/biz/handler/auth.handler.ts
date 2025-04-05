import { Request } from 'express'
import { PrismaUtil } from '../../utils/prisma.util'
import { BizError } from '../../common/error'
import { Constant } from '../../common/constant'
import { AuthInfoType } from '../schema/auth.schema'
import { AuthUtil } from '../../utils/auth.util'

export async function getAuthInfo(req: Request) {
  const userId = AuthUtil.getUserId(req)

  const authInfo = await PrismaUtil.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      nickname: true,
      phone: true,
      status: true,
      remark: true,
      isMaster: true,
      isPlatformAdmin: true,
      email: true
    }
  })

  const { perms } =
    (await PrismaUtil.perm.findFirst({
      where: {
        ownerId: userId,
        ownerType: Constant.OwnerType.USER
      },
      select: {
        perms: true
      }
    })) ?? {}

  return {
    info: authInfo,
    perms
  }
}

export async function updateAuthInfo(req: Request) {
  const authInfo: AuthInfoType = req.body
  const userId = AuthUtil.getUserId(req)

  const userExist = await PrismaUtil.user.findFirst({
    where: {
      delFlag: 0,
      phone: authInfo.phone,
      tenantID: authInfo.tenantID,
      id: {
        not: userId
      }
    }
  })

  if (userExist) throw new BizError('手机号已存在')

  await PrismaUtil.user.update({
    where: {
      id: userId
    },
    data: authInfo
  })

  return await PrismaUtil.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: true,
      nickname: true,
      phone: true,
      status: true,
      remark: true,
      isMaster: true,
      isPlatformAdmin: true,
      email: true
    }
  })
}
