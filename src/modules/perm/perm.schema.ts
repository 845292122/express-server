import { z } from 'zod'

export const inputPermSchema = z.object({
  body: z.object({
    id: z.coerce.number().optional(),
    pId: z.coerce.number().optional().default(0),
    key: z.coerce.string().min(1, { message: '权限key不能为空' }),
    name: z.coerce.string().min(1, { message: '权限名称不能为空' }),
    status: z.coerce.number().optional().default(1)
  })
})

export type InputPermType = z.infer<typeof inputPermSchema>['body']
