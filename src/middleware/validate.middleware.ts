import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { BizError } from '../common/error'

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve()
    .then(() => {
      const parsedParams = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      })

      req.body = parsedParams.body
      req.query = parsedParams.query
      req.params = parsedParams.params

      return parsedParams
    })
    .then(() => next())
    .catch(err => {
      if (err.name === 'ZodError') {
        const zodError = err as any
        const firstIssue = zodError.issues[0]
        return next(new BizError(firstIssue.message))
      }
      next(err)
    })
}
