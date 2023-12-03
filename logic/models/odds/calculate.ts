import * as inputTypes from '../../types/odds/input-type'
import * as outputTypes from '../../types/odds/output-type'

import * as inputValidators from '../../validators/odds/input-type'
import * as outputValidators from '../../validators/odds/output-type'

import { avalidator as wrapper } from 'backend-helper-kit'

import { config } from '../../../config'

import { calculateOdds } from '../../modules/calculator'

const avalidator = wrapper(inputValidators, outputValidators, config)

export class OddsLogic {
    @avalidator
    static async calculateOdds(params: inputTypes.calculateOdds): Promise<outputTypes.calculateOdds> {
        return await calculateOdds(params.body.data, params.body.odds, params.body.time, params.body.place)
    }
}
