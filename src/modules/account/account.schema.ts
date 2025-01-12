import { z } from 'zod'

export const createAccountSchema = z.object({
  body: z.object({
    contact: z.string().nonempty('联系人不能为空')
  })
})
