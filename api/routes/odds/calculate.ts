import { Router } from 'express'

import { OddsController } from '../../controllers/odds/calculate'

export const oddsRouter = Router()

//Routes
oddsRouter.post('/', OddsController.calculateOdds)
