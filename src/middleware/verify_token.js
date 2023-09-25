import jwt, { TokenExpiredError, decode } from 'jsonwebtoken'
import { notAuth } from './handle_error'

const verifyToken = (req, res, next) =>{
    const token = req.headers.authorization
    if(!token) return notAuth('Login require', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err){
            const isChecked = err instanceof TokenExpiredError
        
            if (!isChecked) return notAuth('Token khong hop le', res, isChecked)
            if (isChecked) return notAuth('Phien dang nhap het han', res, isChecked)
        }

        req.user = user
        next()
    })
}

export default verifyToken