import mongoose from 'mongoose'
import { env } from 'process'
import 'dotenv/config'
// import { mongo } from '../../utils/config'
// import { logger } from '../utils/logger'

class Connection {
  public connection

  public dbUser: string

  public dbPass: string

  public dbHost: string

  public dbPort: string

  public dbName: string

  public dbAuth: number

  public dbAuthSrc: string

  // public logger: any

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor () {
    this.dbUser = env.DB_USER || ''
    this.dbPass = env.DB_PASS || ''
    this.dbHost = env.DB_HOST || ''
    this.dbPort = env.DB_PORT || ''
    this.dbName = env.DB_NAME || ''
    this.dbAuth = Number(env.DB_AUTH) || 0
    this.dbAuthSrc = env.DB_AUTH_SRC || ''
  }

  public getUrlConnection () {
    let auth = ''

    if (this.dbAuth === 1) {
      auth = `${this.dbUser}:${this.dbPass}@`
    }
    return `mongodb://${auth}${this.dbHost}:${this.dbPort}/${
      this.dbName
    }?authSource=${this.dbAuthSrc}`
  }

  public getDisconnect (event) {
    mongoose.connection.close(() => event())
  }

  public getDatabse (dbName) {
    return this.connection.useDb(dbName)
  }

  public disconnect () {
    return mongoose.disconnect()
  }

  public async connect () {
    try {
      const urlConnect = this.getUrlConnection()
      process.on('SIGINT', () => this.getDisconnect(() => process.exit(0)))
      const mongoConnection = await mongoose.connect(urlConnect, {
        useNewUrlParser: true
      })
      this.connection = mongoConnection.connection
    } catch (error) {
      console.error('Connecting database MongoDB error: ', error)
      // this.logger.error('Connecting database MongoDB error: ', error)
    }
  }
}

export default new Connection()
