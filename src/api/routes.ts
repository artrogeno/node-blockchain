import { Router } from 'express'

import user from './modules/user'
import auth from './modules/auth'
import route from './modules/route'
import gateway from './modules/gateway'

const routes = Router()

routes.use('/user', user)
routes.use('/auth', auth)
routes.use('/route', route)
routes.use(gateway)

export default routes
