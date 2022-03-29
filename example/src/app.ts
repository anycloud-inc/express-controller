import { registerControllers } from '@anycloud/express-controller'
import * as express from 'express'
import { UserController } from './user-controller'

export const app = express()

const router = express.Router()

registerControllers({
  router,
  controllers: [UserController],
  middlewares: [
    (req, res, next) => {
      console.log(
        'method:',
        req.method,
        'path:',
        req.path,
        '\nparams:',
        req.params,
        '\nbody:',
        req.body
      )
      next()
    },
  ],
})

app.use(express.json())
app.use(router)
