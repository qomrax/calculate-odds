import Joi from 'joi'
import { user } from '../user/common'

export const base = Joi.object({
    query: Joi.any(),
    body: Joi.any(),
    user: user
})
