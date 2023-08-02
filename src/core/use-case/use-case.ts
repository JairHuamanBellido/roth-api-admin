export abstract class UseCase<Request = any, Response = any> {
  abstract execute(request: Request): Response | Promise<Response>;
}
