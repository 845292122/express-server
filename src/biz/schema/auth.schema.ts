import { z } from 'zod'

export const authLoginSchema = z.object({
  body: z.object({
    phone: z.coerce.string().min(1, { message: '手机号不能为空' }),
    password: z.coerce.string().min(1, { message: '密码不能为空' })
  })
})

export const authInfoSchema = z.object({
  body: z.object({
    nickname: z.coerce.string().min(1, { message: '昵称不能为空' }),
    phone: z.coerce.string().min(1, { message: '手机号不能为空' }),
    email: z.coerce.string().optional(),
    tenantID: z.coerce.number().nullish()
  })
})

export type AuthLoginType = z.infer<typeof authLoginSchema>['body']
export type AuthInfoType = z.infer<typeof authInfoSchema>['body']
