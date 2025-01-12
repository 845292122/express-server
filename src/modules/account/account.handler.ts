import { Request, Response } from 'express'
import { httpOk } from '../../app'

export default {
  create: async (req: Request, res: Response) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    httpOk(res, 'Hello Account11111!')
  }
}
