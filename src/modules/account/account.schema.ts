import { z } from 'zod'

export const inputAccountSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    contact: z.coerce.string().min(1, { message: '联系人不能为空' }),
    phone: z.coerce.string().regex(/^1[3-9]\d{9}$/, { message: '请输入正确的手机号' }),
    password: z.coerce.string().nullish(),
    company: z.coerce.string().min(1, { message: '公司名称不能为空' }),
    licenseNumber: z.coerce.string().nullish(),
    address: z.coerce.string().nullish(),
    bizType: z.coerce.number().optional().default(0),
    remark: z.coerce.string().nullish(),
    isAdmin: z.coerce.number().optional().default(0),
    trialStartDate: z.coerce.date().nullish(),
    trialEndDate: z.coerce.date().nullish(),
    startDate: z.coerce.date().nullish(),
    endDate: z.coerce.date().nullish(),
    status: z.coerce.number().optional().default(0)
  })
})

export const pageAccountSchema = z.object({
  query: z.object({
    pageNo: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
    company: z.coerce.string().nullish(),
    contact: z.coerce.string().nullish(),
    status: z.coerce.number().nullish()
  })
})

export type InputAccountType = z.infer<typeof inputAccountSchema>['body']
export type PageAccountType = z.infer<typeof pageAccountSchema>['query']
