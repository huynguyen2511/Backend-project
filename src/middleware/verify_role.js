import { notAuth } from "./handle_error"

export const isAdmin = (req, res, next) =>{
    const {role_code} = req.user
    if (role_code !== 'R1') return notAuth('Only Admin can enter', res)
    next()
}

export const isModerator = (req, res, next) =>{
    const {role_code} = req.user
    if (role_code !== 'R2') return notAuth('Only Moderator can enter', res)
    next()
}