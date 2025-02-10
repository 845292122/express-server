import { z } from 'zod'

export const tenantInputSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    contactName: z.coerce.string().trim().min(1, { message: '租户联系人不能为空' }),
    contactPhone: z.coerce
      .string()
      .trim()
      .regex(/^1[3-9]\d{9}$/, { message: '请输入正确的手机号' }),
    companyName: z.coerce.string().trim().min(1, { message: '租户公司名称不能为空' }),
    licenseNumber: z.coerce.string().nullish(),
    address: z.coerce.string().nullish(),
    domain: z.coerce.string().nullish(),
    remark: z.coerce.string().nullish(),
    userCount: z.coerce.number().optional(),
    trialStartDate: z.coerce.date().nullish(),
    trialEndDate: z.coerce.date().nullish(),
    startDate: z.coerce.date().nullish(),
    endDate: z.coerce.date().nullish(),
    status: z.coerce.number().optional().default(0),
    isPremium: z.coerce.number().optional().default(0)
  })
})

export const tenantPageSchema = z.object({
  query: z.object({
    pageNo: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
    companyName: z.coerce.string().nullish(),
    contactName: z.coerce.string().nullish(),
    status: z.coerce.number().nullish()
  })
})

export type TenantInputType = z.infer<typeof tenantInputSchema>['body']
export type TenantPageType = z.infer<typeof tenantPageSchema>['query']
