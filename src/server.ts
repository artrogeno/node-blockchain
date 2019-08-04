import app from './app'
import { env } from 'process'
import 'dotenv/config'

app.listen(env.PORT)
