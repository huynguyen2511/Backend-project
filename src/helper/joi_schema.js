import joi from 'joi'

export const name = joi.string().alphanum().min(3).max(30).required()
export const email = joi.string().pattern(new RegExp('gmail.com$')).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
export const sex = joi.string().required()
export const phone = joi.string().max(30).required()
export const jobPosition = joi.string().alphanum().max(10).required()
export const workLocation = joi.string().alphanum().required()
export const district = joi.string().alphanum().required()