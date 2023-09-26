import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";

export const getCurrentEmployer = async (req, res) =>{
    try {
        const { id } = req.user
       
        const response = await service.getOneEmployer(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
