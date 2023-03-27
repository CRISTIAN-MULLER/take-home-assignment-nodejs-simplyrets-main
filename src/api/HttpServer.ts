export enum HttpMethods {
  POST = 'post',
  PUT = 'put',
  GET = 'get',
  DELETE = 'delete',
}

export interface HttpServer {
  on(method: HttpMethods, url: string, callback: Function): void;
  listen(port: number): void;
}
