import { AppDataSource } from './data-source'
import * as express from 'express'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as env from 'dotenv'
import router from './routers/index'
import * as swaggerUi from 'swagger-ui-express'
import service from './config/app_config'
import rateLimit from 'express-rate-limit'
env.config()

const app = express()

// It is a globale  middlewears for chaking the request of a single user in an hour
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests form this IP, Please try again in an hours!!'
})

app.use('/customer', limiter)

app.use(express.json())
app.use(morgan('dev'))
app.use(router)

app.use(express.static('public'))

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.yaml'
    }
  })
)

app.use(cors)

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new user into the database...')
  })
  .catch(error => console.log(error))

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'Fail',
    message: `Can't find the ${req.originalUrl}`
  })
  next()
})

app.use(
  (
    err,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }
)

const port = service.port
app.listen(port, () => console.log(`Server listed on port ${port}`))
