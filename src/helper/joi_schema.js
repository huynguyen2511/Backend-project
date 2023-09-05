import joi from 'joi'

export const name = joi.string().alphanum().min(3).max(30).required()
export const email = joi.string().pattern(new RegExp('gmail.com$')).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()