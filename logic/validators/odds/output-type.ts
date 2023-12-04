import Joi from 'joi'

export const numberOrNullOrUndefined = Joi.alternatives().try(Joi.number(), Joi.any()).required()

export const odd = Joi.object({
    over: numberOrNullOrUndefined,
    under: numberOrNullOrUndefined,
    odd: Joi.number().required()
})

export const calculateOdds = Joi.array().items(odd).required()
