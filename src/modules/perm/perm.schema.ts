import { z } from 'zod'

export const permInputSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    key: z.coerce.string().min(1, { message: '权限key不能为空' }),
    name: z.coerce.string().min(1, { message: '权限名称不能为空' }),
    module: z.coerce.string().nullish(),
    type: z.coerce.number().optional().default(1),
    status: z.coerce.number().optional().default(1)
  })
})

export const permPageSchema = z.object({
  query: z.object({
    pageNo: z.coerce.number().default(1),
    pageSize: z.coerce.number().default(10),
    name: z.coerce.string().nullish(),
    type: z.coerce.number().nullish(),
    status: z.coerce.number().nullish()
  })
})

export type PermInputType = z.infer<typeof permInputSchema>['body']
export type PermPageType = z.infer<typeof permPageSchema>['query']
