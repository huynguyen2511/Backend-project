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

export const createNewCompany = async (req, res) =>{
    try {
        const { companyName, phone, email, taxCode, field_of_activity, staffSize, workLocation, district, description } = req.body
        const { id } = req.user
        // const {error}  = joi.object({ id, companyName, phone, email, taxCode, field_of_activity, staffSize, workLocation, district, description }).validate(req.body)
        // if(error) return badRequest(error.details[0]?.message, res)
        if (!id || !companyName || !phone || !email || !taxCode || !field_of_activity || !staffSize || !workLocation || !district ) return res.status(400).json({
            err: 1,
            mes: 'Missing input'
        })


        const response = await service.createCompany(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
