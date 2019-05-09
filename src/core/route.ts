import * as express from "express";

export enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete"
}

function defaultHandler(data) {
  return (req: express.Request, res: express.Response) => res.send(data);
}

export class Route {
  public delay: number = 1;
  public delayms: number;
  public route: string;
  public _method: Methods;
  public data: any;
  public handler: express.RequestHandler;
  public wrapper: Function;

  constructor({
    delay,
    delayms,
    route,
    method = Methods.GET,
    data,
    handler,
    wrapper
  }: {
    delay?: number;
    delayms?: number;
    route: string;
    method: Methods;
    data?;
    handler?;
    wrapper?;
  }) {
    this.delay = delay;
    this.delayms = delayms;
    this.route = route;
    this.method = method;
    this.data = data;
    this.wrapper = wrapper;

    if (handler) this.handler = handler;
    else
      this.handler = this.wrapper
        ? defaultHandler(this.wrapper(data))
        : defaultHandler(data);
  }

  set method(value) {
    this._method = this.resolveMethod(value);
  }

  get method() {
    return this._method;
  }

  private resolveMethod(method): Methods {
    switch (method) {
      case "get":
        return Methods.GET;
      case "post":
        return Methods.POST;
      case "put":
        return Methods.PUT;
      case "delete":
        return Methods.DELETE;
    }
  }

  public resolveTime() {
    return this.delayms || (this.delay ? this.delay * 1000 : 1000);
  }
}
