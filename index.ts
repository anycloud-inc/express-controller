import * as express from "express";

type Method = "get" | "post" | "put" | "patch" | "delete";

interface RouteItem {
  method: Method;
  path: string;
  action: string;
}

export class RestRouter {
  constructor(
    private router: express.Router,
    private middlewares: express.Handler[]
  ) {}

  registerControllers(controllers: Array<new () => any>) {
    controllers.forEach((controller) => {
      this.registerController(controller);
    });
  }

  registerController(controller: new () => any) {
    const instance = new controller();
    instance._routes.forEach((route: RouteItem) => {
      const path = instance._basePath + route.path;
      this.router[route.method](
        path,
        ...this.middlewares,
        (instance as any)[route.action].bind(instance)
      );
    });
  }
}

export const Controller = (basePath: string) => {
  // return Class Decorator
  return <T extends new (...args: any[]) => {}>(target: T) => {
    return class RouteController extends target {
      _basePath = basePath;

      constructor(...args: any[]) {
        super(...args);
      }
    };
  };
};

export const Get = (path?: string): MethodDecorator => {
  return MethodFactory("get", path);
};

export const Post = (path?: string): MethodDecorator => {
  return MethodFactory("post", path);
};

export const Put = (path?: string): MethodDecorator => {
  return MethodFactory("put", path);
};

export const Patch = (path?: string): MethodDecorator => {
  return MethodFactory("patch", path);
};

export const Delete = (path?: string): MethodDecorator => {
  return MethodFactory("delete", path);
};

const MethodFactory = (method: Method, path?: string) => {
  return (
    target: any,
    property: string | symbol,
    _descriptor: PropertyDescriptor
  ) => {
    target._routes = target._routes ?? [];
    target._routes.push({ method, path: path ?? "", action: property });
  };
};
