# express-controller

[![npm version](https://badge.fury.io/js/@anycloud%2Fexpress-controller.svg)](https://badge.fury.io/js/@anycloud%2Fexpress-controller)

This package provides class-based RESTful controllers for express.

Inspired by [routing-controllers](https://github.com/typestack/routing-controllers), but with a minimal and lightweight implementation.

## Installation

1. Install module:
   `npm install @anycloud/express-controller`

2. Set options in `tsconfig.json` file of your project:
   ```json
   {
     "emitDecoratorMetadata": true,
     "experimentalDecorators": true
   }
   ```

## Example of usage

Suppose you want to create a CRUD API for users resources as follows.

```
GET /users
GET /users/:id
POST /users
PATCH /users/:id
DELETE /users/:id
```

This can be accomplished with the following code.

1. Create a controller

```ts
import { Request, Response, NextFunction } from "express";

import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from "@anycloud/express-controller";

// Register a base path
@Controller("/users")
class UserController {
  // Register a path for each endoint
  @Get("/")
  async index(_req: Request, res: Response, _next: NextFunction) {
    res.json({
      message: "index example",
    });
  }

  // Parameters can be written in the same way as for express router
  @Get("/:id")
  async show(req: Request, res: Response, _next: NextFunction) {
    res.json({
      params: req.params,
      message: "show example",
    });
  }

  @Post("/")
  async create(req: Request, res: Response, _next: NextFunction) {
    res.json({
      body: req.body,
      message: "create example",
    });
  }

  @Patch("/:id")
  async update(req: Request, res: Response, _next: NextFunction) {
    res.json({
      params: req.params,
      body: req.body,
      message: "update example",
    });
  }

  @Delete("/:id")
  async delete(req: Request, res: Response, _next: NextFunction) {
    res.json({
      params: req.params,
      message: "delete example",
    });
  }
}
```

2. Register the controller with express router.

```ts
import * as express from "express";
import { registerControllers } from "@anycloud/express-controller";

const app = express();
const router = express.Router();

registerControllers({ router, controllers: [UserController] });

app.use(router);
app.listen();
```
