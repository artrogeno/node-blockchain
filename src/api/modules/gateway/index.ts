import { Router } from 'express'

import blockchain from './blockchain'

const routes = Router()

routes.use(blockchain)

export default routes
