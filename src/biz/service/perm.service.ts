import { PrismaUtil } from '../../utils/prisma.util'

// * 分配权限
export async function assignPerm(perms: string[], ownerId: number, ownerType: number) {
  await PrismaUtil.perm.upsert({
    where: {
      ownerId_ownerType: {
        ownerId,
        ownerType
      }
    },
    create: {
      ownerId,
      ownerType,
      perms
    },
    update: {
      perms
    }
  })
}

export async function getPerms(ownerId: number, ownerType: number) {
  return await PrismaUtil.perm.findFirst({
    where: {
      ownerId,
      ownerType
    }
  })
}
