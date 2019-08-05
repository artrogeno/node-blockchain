import { Router } from 'express'

import EthereumController from './controllers/ethereum.controller'

const routes = Router()

routes.get('/', EthereumController.index)

export default routes
