import * as express from "express";
import { Request, Response, NextFunction } from "express";

import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  registerControllers,
} from "@anycloud/express-controller";

@Controller("/users")
class UserController {
  @Get("/")
  async index(_req: Request, res: Response, _next: NextFunction) {
    res.json({
      message: "index example",
    });
  }

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

const app = express();
const router = express.Router();
const port = Number(process.env.PORT) || 3000;

registerControllers({
  router,
  controllers: [UserController],
  middlewares: [
    (req, res, next) => {
      console.log(req.path);
      console.log(req.params);
      console.log(req.body);
      next();
    },
  ],
});

app.use(router);

app.listen(port, () => console.log(`Server listening on port ${port}`));
