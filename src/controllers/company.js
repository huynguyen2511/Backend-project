import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";
import { companyName, phone, email, taxCode, field_of_activity, staffSize, workLocation, district, description } from "../helper/joi_schema";
import joi from "joi";

export const updateCompany = async (req, res) =>{
    
    try {
        const response = await service.updateCompany( req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const updateLicense = async (req, res) =>{
    try {
        const response = await service.updateLicense(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}


