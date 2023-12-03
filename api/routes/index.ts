import { authRouter } from './user/auth'
import { oddsRouter } from './odds/calculate'
import { permissionRouter } from './user/permission'

import { Express } from 'express'

export function addRoutes(app: Express) {
    app.use('/auth', authRouter)
    app.use('/calculate-odds', oddsRouter)
    app.use('/permission', permissionRouter)
}
