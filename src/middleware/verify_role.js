import { notAuth } from "./handle_error"

export const isAdmin = (req, res, next) =>{
    const {role_code} = req.user
    if (role_code !== 'R1') return notAuth('Only Admin can enter', res)
    next()
}

export const isUser = (req, res, next) =>{
    const {role_code} = req.user
    if (role_code !== 'R2') return notAuth('Only Moderator can enter', res)
    next()
}

export const isEmployer = (req, res, next) =>{
    const {role_code} = req.user
    if (role_code !== 'R3') return notAuth('Only Employer can enter', res)
    next()
}