import { z } from 'zod'

export const inputAccountSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    contact: z.coerce.string().min(1, { message: '联系人不能为空' }),
    phone: z.coerce.string().regex(/^1[3-9]\d{9}$/, { message: '请输入正确的手机号' }),
    password: z.coerce.string().optional(),
    company: z.coerce.string().min(1, { message: '公司名称不能为空' }),
    licenseNumber: z.coerce.string().optional(),
    address: z.coerce.string().optional(),
    bizType: z.coerce.number().optional().default(0),
    remark: z.coerce.string().optional(),
    isAdmin: z.coerce.number().optional().default(0),
    trialStartDate: z.coerce.date().optional(),
    trialEndDate: z.coerce.date().optional(),
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    status: z.coerce.number().optional().default(0)
  })
})

export const pageAccountSchema = z.object({
  query: z.object({
    pageNo: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
    company: z.coerce.string().optional()
  })
})

export type InputAccountType = z.infer<typeof inputAccountSchema>['body']
export type PageAccountType = z.infer<typeof pageAccountSchema>['query']
