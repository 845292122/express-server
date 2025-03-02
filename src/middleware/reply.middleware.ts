import { Request, Response, NextFunction } from 'express'
export const reply = (fn: (req: Request) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req))
      .then(data => res.send(data))
      .catch(next)
  }
}
