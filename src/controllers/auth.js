import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";
import { email, password } from "../helper/joi_schema";
import joi from 'joi'

export const register = async (req, res) =>{
    try {
        const { error } = joi.object({ email , password}).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res)
        const response = await service.register(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const login = async (req, res) =>{
    try {
        const { error } = joi.object({ email , password}).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res)
        const response = await service.login(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}