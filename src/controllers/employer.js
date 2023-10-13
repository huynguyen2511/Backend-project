import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";
import { companyName, phone, email, taxCode, field_of_activity, staffSize, workLocation, district, description } from "../helper/joi_schema";
import joi from "joi";

export const getCurrentEmployer = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.getOneEmployer(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}


export const updateEmployer = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.updateEmployer(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

