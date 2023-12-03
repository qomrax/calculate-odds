import { OddsLogic } from '../../../logic/models/odds/calculate'

import { ahandler, formatter as wrapper } from 'backend-helper-kit'

import { Request, Response, NextFunction } from 'express'

const formatter = wrapper(OddsLogic)

type status = {
    next: boolean
    continue: boolean
}

export class OddsController {
    @ahandler
    @formatter
    static async calculateOdds(req: Request, res: Response, next: NextFunction): Promise<status | void> {}
}
