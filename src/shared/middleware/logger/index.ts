import winston from 'winston'

import config from '../../utils/config'

class Logger {
  public logger

  public log

  public logLevel

  public format

  constructor () {
    this.log = config.log
    this.logLevel = config.logLevel
    this.setLogger()
  }

  private setLogger () {
    if (this.log) {
      this.addLogger()
    }
  }

  private addLogger () {
    this.logger = winston.createLogger({
      transports: [new winston.transports.Console()],
      level: this.logLevel,
      // prettyPrint: true,
      format: this.format.combine(
        this.format.colorize(),
        this.format.json()
      )
    })
  }
}

export const logger = new Logger().logger
