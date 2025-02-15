import { Request, Response } from 'express'
import { TenantInputType, TenantPageType } from './tenant.schema'
import { convertPageParam, PrismaHelper } from '../../helper/prisma.helper'
import { BizError } from '../../common/error'
import { httpOk } from '../../app'

// 创建租户
const create = async (req: Request, res: Response) => {
  const tenantInfo: TenantInputType = req.body

  const tenantExist = await PrismaHelper.tenant.findFirst({
    where: {
      contactPhone: tenantInfo.contactPhone,
      delFlag: 0
    }
  })

  if (tenantExist) throw new BizError('该手机号已经绑定租户')

  await PrismaHelper.tenant.create({
    data: tenantInfo
  })

  httpOk(res)
}

// 修改租户
const modify = async (req: Request, res: Response) => {
  const tenantInfo: TenantInputType = req.body

  const tenantExist = await PrismaHelper.tenant.findFirst({
    where: {
      contactPhone: tenantInfo.contactPhone,
      delFlag: 0,
      id: {
        not: tenantInfo.id
      }
    }
  })

  if (tenantExist) throw new BizError('该手机号已经绑定租户')

  await PrismaHelper.tenant.update({
    where: {
      id: tenantInfo.id
    },
    data: tenantInfo
  })

  httpOk(res)
}

// 删除租户
const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  await PrismaHelper.tenant.update({
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

// 分页查询
const page = async (req: Request, res: Response) => {
  const { pageNo, pageSize, companyName, contactName, status } = req.query as unknown as TenantPageType
  const pageParam = convertPageParam(pageNo, pageSize)
  const condition = {
    delFlag: 0,
    company: companyName ? { startsWith: companyName } : undefined,
    contact: contactName ? { startsWith: contactName } : undefined,
    status: status ?? undefined
  }

  const [total, records] = await Promise.all([
    PrismaHelper.tenant.count({
      where: condition
    }),
    PrismaHelper.tenant.findMany({
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

  httpOk(res, {
    total,
    records
  })
}

// 获取租户详情
const info = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const tenantInfo = await PrismaHelper.tenant.findUnique({
    where: {
      id
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
  httpOk(res, tenantInfo)
}

// * 租户处理
export default {
  create,
  modify,
  remove,
  page,
  info
}
