import { Request, Response, NextFunction } from 'express'
import { BizError, NotFoundError } from '../common/error'
import { loggerUtil } from '../utils/logger.util'
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BizError || err instanceof NotFoundError) {
    res.status(err.code).send(err.message)
    loggerUtil.error(err.stack)
    return
  }

  loggerUtil.error(err.stack)
  res.status(500).send('Internal Server Error')
}
