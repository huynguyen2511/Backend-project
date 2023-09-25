import joi from 'joi'

export const name = joi.string().min(5).max(30).required()
export const email = joi.string().pattern(new RegExp('gmail.com$')).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
export const sex = joi.string().min(4).max(6).required()
export const phone = joi.string().max(10).required()
export const jobPosition = joi.string().required()
export const workLocation = joi.string().required()
export const district = joi.string().required()
export const refreshToken = joi.string().required()