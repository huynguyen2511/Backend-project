import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";
// import { email, password } from "../helper/joi_schema";
// import joi from 'joi'

export const getCurrent = async (req, res) =>{
    try {
        const { id } = req.user
       
        const response = await service.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}