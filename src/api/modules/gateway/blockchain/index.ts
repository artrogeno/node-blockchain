import { Router } from 'express'

import ethereum from './ethereum'

const routes = Router()

routes.use('/ethereum', ethereum)

export default routes
