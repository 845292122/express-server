export class BizError extends Error {
  public code: number

  constructor(message: string, code: number = 400) {
    super(message)
    this.name = 'BizError'
    this.code = code

    Object.setPrototypeOf(this, BizError.prototype)
  }
}

export class NotFoundError extends Error {
  public code: number
  constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
    this.code = 404

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }
}
