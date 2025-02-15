import { z } from 'zod'

export const authLoginSchema = z.object({
  body: z.object({
    phone: z.coerce.string().min(1, { message: '手机号不能为空' }),
    password: z.coerce.string().min(1, { message: '密码不能为空' })
  })
})

export type AuthLoginType = z.infer<typeof authLoginSchema>['body']
