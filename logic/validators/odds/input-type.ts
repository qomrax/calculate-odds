import Joi from 'joi'
import { base } from './common'

export const place = Joi.object({
    home: Joi.number().required(),
    away: Joi.number().required()
})

export const calculateOdds = base.keys({
    body: Joi.object({
        data: Joi.object({
            preXg: place.required(),
            liveXg: place.required(),
            preXs: place.required(),
            currentShots: place.required(),
            currentScore: place.required(),
            time: Joi.number().required(),
            expectedAddedTime: Joi.number().required(),
            payback: Joi.number().required()
        }).required(),
        odds: Joi.array().items(Joi.number()).required(),
        time: Joi.string().valid('all', 'remain').required(),
        place: Joi.string().valid('home', 'away').required()
    }).required()
})
