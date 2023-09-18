import user from './user'
import employer from './employer'
import auth from './auth'
import insert from './insert'
import { internalServerError, notFound } from '../middleware/handle_error'

const initRoutes = (app) =>{

    app.use('/api/user', user)
    app.use('/api/employer', employer)
    app.use('/api/auth', auth)
    app.use('/api/insert', insert)

    app.use(notFound)
}


module.exports = initRoutes

