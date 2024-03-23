export class Result<T> {
  private isSuccess: boolean
  private value?: T
  private error?: Error

  constructor(isSuccess: boolean, value?: T, error?: Error) {
    this.isSuccess = isSuccess
    this.value = value
    this.error = error
  }

  getIsSuccess() {
    return this.isSuccess
  }

  getValue() {
    if (!this.isSuccess) {
      throw this.error
    }
    return this.value
  }

  getError() {
    return this.error
  }
}
