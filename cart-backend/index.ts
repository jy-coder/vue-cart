import express, { Application } from 'express'
import dotenv from 'dotenv'
import { errorHandler } from './src/middlewares/errors'
import { json } from 'body-parser'
import cartRoute from './src/routes/cartRoute'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import xssFilterMiddleware from './src/middlewares/xssFilter'
import cors from 'cors'

dotenv.config()

const app: Application = express()
const port = process.env.PORT || 8000

app.use(json())
app.use(hpp())

// for dev purpose
app.use(
  cors({
    origin: '*'
  })
)

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
)
app.use(xssFilterMiddleware)

app.use('/cart', cartRoute)

// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to Express & TypeScript Server");
// });

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`)
})
