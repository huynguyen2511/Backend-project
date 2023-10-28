import user from './user'
import employer from './employer'
import auth from './auth'
import jobPost from './jobPost'
import insert from './insert'
import admin from './admin'
import { internalServerError, notFound } from '../middleware/handle_error'

const initRoutes = (app) =>{

    app.use('/api/user', user)
    app.use('/api/employer', employer)
    app.use('/api/post', jobPost)
    app.use('/api/auth', auth)
    app.use('/api/insert', insert)
    app.use('/api/admin', admin)

    app.use(notFound)
}


module.exports = initRoutes

