import { Request, Response, NextFunction } from 'express'
import { BizError, NotFoundError } from '../common/error'
import logger from '../helper/logger.helper'
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof BizError || err instanceof NotFoundError) {
    res.status(err.code).json({ message: err.message })
    return
  }

  logger.error(err.stack)
  res.status(500).json({ message: 'Internal Server Error' })
}
