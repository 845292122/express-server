import { z } from 'zod'

export const inputAccountSchema = z.object({
  body: z.object({
    contact: z.coerce.string().min(1, { message: '联系人不能为空' }),
    phone: z.coerce.string().regex(/^1[3-9]\d{9}$/, { message: '请输入正确的手机号' })
  })
})

export type createAccountType = z.infer<typeof inputAccountSchema>['body']
