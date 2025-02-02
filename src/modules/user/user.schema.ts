import { z } from 'zod'

export const userInputSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    tenantId: z.coerce.number(),
    username: z.coerce.string().trim().min(1, { message: '用户名不能为空' }),
    password: z.coerce.string().nullish(),
    contact: z.coerce.string().trim().min(1, { message: '联系人不能为空' }),
    position: z.coerce.string().nullish(),
    phone: z.coerce.string().trim().min(1, { message: '手机号不能为空' }),
    isTenantAdmin: z.coerce.number().optional().default(0),
    status: z.coerce.number().optional().default(0),
    remark: z.coerce.string().nullish(),
    wxId: z.coerce.string().nullish()
  })
})

export const userPageSchema = z.object({
  query: z.object({
    pageNo: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
    username: z.coerce.string().nullish(),
    contact: z.coerce.string().nullish(),
    status: z.coerce.number().nullish()
  })
})

export type UserInputType = z.infer<typeof userInputSchema>['body']
export type UserPageType = z.infer<typeof userPageSchema>['query']
