import { env } from 'process'
import path from 'path'
import merge from 'lodash/merge'
import * as dotenv from 'dotenv-safe'
import 'dotenv/config'

/* istanbul ignore next */
const requireProcessEnv = name => {
  if (!env[name]) {
    throw new Error(`You must set the ${name} environment variable`)
  }
  return env[name]
}

/* istanbul ignore next */
if (env.NODE_ENV !== 'production') {
  dotenv.load({
    path: path.join(__dirname, '../../../../.env'),
    sample: path.join(__dirname, '../../../../.env.example')
  })
}

const config = {
  all: {
    env: env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: env.PORT || 9000,
    ip: env.IP || '0.0.0.0',
    api: env.API || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: {},
  development: {
    mongo: {
      user: env.DB_USER || '',
      pass: env.DB_PASS || '',
      host: env.DB_HOST || 'localhost',
      port: env.DB_POST || '27017',
      name: env.DB_NAME || 'artrogeno_dev',
      auth: Number(env.DB_AUTH) || 0,
      authSrc: env.DB_AUTH_SRC || 'artrogeno_dev'
    }
  },
  production: {
    ip: env.IP || undefined,
    port: env.PORT || 8080,
    mongo: {
      user: env.DB_USER || '',
      pass: env.DB_PASS || '',
      host: env.DB_HOST || 'localhost',
      port: env.DB_POST || '27017',
      name: env.DB_NAME || 'artrogeno_prod',
      auth: Number(env.DB_AUTH) || 0,
      authSrc: env.DB_AUTH_SRC || 'production'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
