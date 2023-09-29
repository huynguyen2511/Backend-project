import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";

export const getCurrent = async (req, res) =>{
    try {
        const { id } = req.user
       
        const response = await service.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}