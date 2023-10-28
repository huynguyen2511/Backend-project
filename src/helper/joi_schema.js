import joi from 'joi'

export const id = joi.required()

export const name = joi.string().min(5).max(30).required()
export const email = joi.string().pattern(new RegExp('gmail.com$')).required()
export const password = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
export const gender = joi.string().min(4).max(6).required()
export const phone = joi.string().max(10).required()
export const jobPosition = joi.string().required()
export const company = joi.string().required()
export const workLocation = joi.string().required()
export const refreshToken = joi.string().required()

export const companyName = joi.string().required()
export const taxCode = joi.string().pattern(new RegExp('[0-9]{10}-[0-9]{3}')).required()
export const field_of_activity = joi.string().required()
export const staffSize = joi.string().required()
export const description = joi.string()
export const address = joi.string().required()
export const provinceCode = joi.string().required()

export const tittle = joi.string().required()
export const label = joi.string().required()
export const categoryCode = joi.string().required()
export const procategoryvince = joi.string().required()
export const salary = joi.string().required()
export const benefits = joi.string().required()
export const username = joi.string().required()

