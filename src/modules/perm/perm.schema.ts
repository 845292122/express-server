import { z } from 'zod'

export const permInputSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    pId: z.coerce.number().optional().default(0),
    key: z.coerce.string().min(1, { message: '权限key不能为空' }),
    name: z.coerce.string().min(1, { message: '权限名称不能为空' }),
    status: z.coerce.number().optional().default(1)
  })
})

export const permListSchema = z.object({
  query: z.object({
    name: z.coerce.string().nullish(),
    status: z.coerce.number().nullish()
  })
})

export type PermInputType = z.infer<typeof permInputSchema>['body']
export type PermListType = z.infer<typeof permListSchema>['query']
