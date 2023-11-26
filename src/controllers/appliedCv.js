import * as service from "../services";
import { internalServerError, badRequest } from "../middleware/handle_error";

export const createAppliedCv = async (req, res) =>{
    try {
        const { id } = req.user;
        const response = await service.createAppliedCv(req.body ,id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getAppliedPosts = async (req, res) =>{
    try {
        const { id } = req.user;
        const response = await service.getAppliedCvByUser(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getAppliedCvs = async (req, res) =>{
    try {
        const { id } = req.user;
        const response = await service.getAppliedCvByEmployer(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const setStatusAppliedCv = async (req, res) =>{
    try {
        console.log(req.body);
        const response = await service.setStatusAppliedCv(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}