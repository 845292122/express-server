import { Request } from 'express'
import { JwtPayloadType } from '../../utils/jwt.util'
import { PrismaUtil } from '../../utils/prisma.util'
import { UnauthorizedError } from '../../common/error'
import { Constant } from '../../common/constant'

export async function getAuthInfo(req: Request) {
  const userId = (req.user as JwtPayloadType)?.id

  if (!userId) {
    throw new UnauthorizedError('token已失效')
  }

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
      isPlatformAdmin: true
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
