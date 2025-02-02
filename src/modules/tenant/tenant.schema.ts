import { z } from 'zod'

export const inputTenantSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    contact: z.coerce.string().trim().min(1, { message: '租户联系人不能为空' }),
    phone: z.coerce.string().trim().min(1, { message: '租户联系电话不能为空' }),
    company: z.coerce.string().trim().min(1, { message: '租户公司名称不能为空' }),
    address: z.coerce.string().nullish(),
    type: z.coerce.number().optional().default(0),
    remark: z.coerce.string().nullish(),
    isPlatformAdmin: z.coerce.number().optional().default(0),
    trialStartDate: z.coerce.date().nullish(),
    trialEndDate: z.coerce.date().nullish(),
    startDate: z.coerce.date().nullish(),
    endDate: z.coerce.date().nullish(),
    status: z.coerce.number().optional().default(0)
  })
})

export const pageTenantSchema = z.object({
  query: z.object({
    pageNo: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
    company: z.coerce.string().nullish(),
    contact: z.coerce.string().nullish(),
    type: z.coerce.number().nullish(),
    status: z.coerce.number().nullish()
  })
})

export type InputTenantType = z.infer<typeof inputTenantSchema>['body']
export type PageTenantType = z.infer<typeof pageTenantSchema>['query']
