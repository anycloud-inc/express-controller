import { Request, Response, NextFunction } from 'express'
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
} from '@anycloud/express-controller'

@Controller('/users')
export class UserController {
  @Get('/')
  async index(_req: Request, res: Response, _next: NextFunction) {
    res.json({
      message: 'index example',
    })
  }

  @Get('/:id')
  async show(req: Request, res: Response, _next: NextFunction) {
    res.json({
      params: req.params,
      message: 'show example',
    })
  }

  @Post('/')
  async create(req: Request, res: Response, _next: NextFunction) {
    res.json({
      body: req.body,
      message: 'create example',
    })
  }

  @Patch('/:id')
  async update(req: Request, res: Response, _next: NextFunction) {
    res.json({
      params: req.params,
      body: req.body,
      message: 'update example',
    })
  }

  @Delete('/:id')
  async delete(req: Request, res: Response, _next: NextFunction) {
    res.json({
      params: req.params,
      message: 'delete example',
    })
  }
}
