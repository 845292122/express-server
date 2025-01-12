export class BizError extends Error {
  public code: number

  constructor(message: string, code: number = 400) {
    super(message) // 调用父类的构造函数
    this.name = 'BizError' // 错误名称
    this.code = code // 业务状态码

    Object.setPrototypeOf(this, BizError.prototype)
  }
}
