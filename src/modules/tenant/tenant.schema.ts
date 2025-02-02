import { z } from 'zod'

export const tenantInputSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    contact: z.coerce.string().trim().min(1, { message: '租户联系人不能为空' }),
    phone: z.coerce
      .string()
      .trim()
      .regex(/^1[3-9]\d{9}$/, { message: '请输入正确的手机号' }),
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

export const tenantPageSchema = z.object({
  query: z.object({
    pageNo: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
    company: z.coerce.string().nullish(),
    contact: z.coerce.string().nullish(),
    type: z.coerce.number().nullish(),
    status: z.coerce.number().nullish()
  })
})

export type TenantInputType = z.infer<typeof tenantInputSchema>['body']
export type TenantPageType = z.infer<typeof tenantPageSchema>['query']
