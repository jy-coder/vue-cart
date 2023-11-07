import express, { Application } from 'express'
import dotenv from 'dotenv'
import { errorHandler } from './src/middlewares/errors'
import { json } from 'body-parser'
import cartRoute from './src/cart/routes/cartRoute'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import morgan from 'morgan'
import authRoute from './src/auth/routes/authRoute'
import xssFilterMiddleware from './src/middlewares/xssFilter'
import swaggerDocs from './src/swagger/swagger'
import userRoute from './src/user/route/userRoute'
import roleRoute from './src/role/route/roleRoute'

dotenv.config()

const app = express()
const port: number = Number(process.env.PORT) || 8000

app.use(json())
app.use(hpp())

// for dev purpose
app.use(
  cors({
    origin: '*'
  })
)

app.use(morgan('dev'))

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
)
app.use(xssFilterMiddleware)

app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/role', roleRoute)
// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to Express & TypeScript Server");
// });

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
  swaggerDocs(app, port)
})
