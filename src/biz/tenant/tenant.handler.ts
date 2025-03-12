import { Request } from 'express'
import { TenantInputType, TenantPageType } from './tenant.schema'
import { convertPageParam } from '../../utils/common.util'
import { PrismaUtil } from '../../utils/prisma.util'
import { BizError } from '../../common/error'

export async function createTenant(req: Request) {
  const tenantInfo: TenantInputType = req.body

  const tenantExist = await PrismaUtil.tenant.findFirst({
    where: {
      contactPhone: tenantInfo.contactPhone,
      delFlag: 0
    }
  })

  if (tenantExist) throw new BizError('该手机号已经绑定租户')

  await PrismaUtil.tenant.create({
    data: tenantInfo
  })

  return
}

export async function modifyTenant(req: Request) {
  const tenantInfo: TenantInputType = req.body

  const tenantExist = await PrismaUtil.tenant.findFirst({
    where: {
      contactPhone: tenantInfo.contactPhone,
      delFlag: 0,
      id: {
        not: tenantInfo.id
      }
    }
  })

  if (tenantExist) throw new BizError('该手机号已经绑定租户')

  await PrismaUtil.tenant.update({
    where: {
      id: tenantInfo.id
    },
    data: tenantInfo
  })
  return
}

export async function removeTenant(req: Request) {
  const id = Number(req.params.id)
  await PrismaUtil.tenant.update({
    where: {
      id,
      delFlag: 0
    },
    data: {
      delFlag: 1
    }
  })
  return
}

export async function getTenantPage(req: Request) {
  const { pageNo, pageSize, companyName, contactName, status } = req.query as unknown as TenantPageType
  const pageParam = convertPageParam(pageNo, pageSize)
  const condition = {
    delFlag: 0,
    companyName: companyName ? { startsWith: companyName } : undefined,
    contactName: contactName ? { startsWith: contactName } : undefined,
    status: status ?? undefined
  }

  const [total, records] = await Promise.all([
    PrismaUtil.tenant.count({
      where: condition
    }),
    PrismaUtil.tenant.findMany({
      where: condition,
      select: {
        id: true,
        contactName: true,
        contactPhone: true,
        companyName: true,
        licenseNumber: true,
        address: true,
        remark: true,
        isPremium: true,
        trialStartDate: true,
        trialEndDate: true,
        startDate: true,
        endDate: true,
        status: true
      },
      ...pageParam
    })
  ])

  return {
    total,
    records
  }
}

export async function getTenantInfo(req: Request) {
  const id = Number(req.params.id)
  const tenantInfo = await PrismaUtil.tenant.findUnique({
    where: {
      id,
      delFlag: 0
    },
    select: {
      id: true,
      contactName: true,
      contactPhone: true,
      companyName: true,
      licenseNumber: true,
      address: true,
      remark: true,
      isPremium: true,
      trialStartDate: true,
      trialEndDate: true,
      startDate: true,
      endDate: true,
      status: true
    }
  })

  return tenantInfo
}

export async function getTenantList(req: Request) {
  return await PrismaUtil.tenant.findMany({
    where: {
      delFlag: 0
    },
    select: {
      id: true,
      companyName: true,
      isPremium: true
    }
  })
}
