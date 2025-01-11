export class BusinessError extends Error {
  public statusCode: number

  constructor(message: string, statusCode: number = 400) {
    super(message) // 调用父类的构造函数
    this.name = 'BusinessError' // 错误名称
    this.statusCode = statusCode // HTTP 状态码
  }
}
