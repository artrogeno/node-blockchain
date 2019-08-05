import { Request, Response } from 'express'

class EthereumController {
  public index (req: Request, res: Response):Response {
    return res.json({ geteway: 'Ethereum endpoint its working' })
  }
}

export default new EthereumController()
