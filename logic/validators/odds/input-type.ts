import Joi from 'joi'
import { base } from './common'

export const calculateOdds = base.keys({
    body: Joi.object({
        data: Joi.object().required(),
        odds: Joi.array().items(Joi.number()).required(),
        time: Joi.string().required(),
        place: Joi.string().required()
    }).required()
})
