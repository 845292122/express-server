import { BizError } from '../../common/error'
import { PrismaUtil } from '../../utils/prisma.util'
import { UserInputType } from '../schema/user.schema'

export async function verifyUserCount(user: UserInputType) {
  const tenant = await PrismaUtil.tenant.findFirst({
    where: {
      delFlag: 0,
      id: user.tenantID
    },
    select: {
      userCount: true
    }
  })

  const currentUserCount = await PrismaUtil.user.count({
    where: {
      tenantID: user.tenantID,
      delFlag: 0
    }
  })

  if (currentUserCount >= (tenant?.userCount ?? 10)) {
    throw new BizError('租户用户数量已达上限')
  }
}
