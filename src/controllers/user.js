import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";

export const getCurrent = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.getCurrent(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const updateInfo = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.updateInfo(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const changePassword = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.updatePassword(id , req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}