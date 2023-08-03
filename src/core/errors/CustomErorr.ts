export class CustomError extends Error {
  name: string;
  type: string;
  message: string;
  code: number;
  constructor({
    message,
    name,
    type,
    code,
  }: {
    name: string;
    type: string;
    message: string;
    code: number;
  }) {
    super();

    this.name = name;
    this.type = type;
    this.message = message;
    this.code = code;
  }
}
