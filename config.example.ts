import { validate } from 'backend-helper-kit'
import Joi from 'joi'

let MODULE_NAME = 'soccer-calculator'

type configType = {
    PORT: number
    FLASK_PORT: number
    MONGO_CONNECTION: string
    MODULE_NAME: typeof MODULE_NAME
    MODULE_KEY: string
    SESSION_SECRET: string
    ENV: string
}

const configSchema = Joi.object({
    PORT: Joi.number().required(),
    FLASK_PORT: Joi.number().required(),
    MONGO_CONNECTION: Joi.string().required(),
    MODULE_NAME: Joi.string().required().valid(MODULE_NAME),
    MODULE_KEY: Joi.string().required(),
    SESSION_SECRET: Joi.string().required(),
    ENV: Joi.string().valid('development', 'production').required()
})

export const config: configType = validate(
    {
        PORT: 8000,
        FLASK_PORT: 5000,
        MONGO_CONNECTION: `mongodb://127.0.0.1:27017/${MODULE_NAME}`,
        MODULE_KEY: '123',
        SESSION_SECRET: '123',
        ENV: 'development',
        MODULE_NAME
    },
    configSchema
)

console.log(config)
