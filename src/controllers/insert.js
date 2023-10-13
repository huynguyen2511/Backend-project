import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";

export const insertData = async (req, res) =>{
    try {
        const response = await service.insertData()
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getProvince = async (req, res) =>{
    try {
        const response = await service.getProvince()
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}