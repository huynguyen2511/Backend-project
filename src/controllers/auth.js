import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";
import { name, email, password, sex, phone, jobPosition, workLocation, district, refreshToken } from "../helper/joi_schema";
import joi from 'joi'

export const register = async (req, res) =>{
    try {
        const { error } = joi.object({ name, email , password }).validate(req.body)
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


export const employerRegister = async (req, res) =>{
    try {
        const { error } = joi.object({ name, email , password, sex, phone, jobPosition, workLocation, district }).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res)
        const response = await service.employerRegister(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const employerLogin = async (req, res) =>{
    try {
        const { error } = joi.object({ email , password}).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res)
        const response = await service.employerLogin(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const refreshTokenController = async (req, res) =>{
    try {
        const { error } = joi.object({ refreshToken }).validate(req.body)
        console.log(req.body.refreshToken);
        if(error) return badRequest(error.details[0]?.message, res)
        const response = await service.refreshToken(req.body.refreshToken)
        console.log(response);
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}