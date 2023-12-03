import Joi from 'joi'

export const odd = Joi.object({
    over: Joi.number().required(),
    under: Joi.number().required(),
    odd: Joi.number().required()
})

export const calculateOdds = Joi.array().items(odd).required()
