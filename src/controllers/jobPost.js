import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";



export const createNewPost = async (req, res) =>{
    try {
        const { id } = req.user
        const { tittle, label, categoryCode, areaCode } = req.body
        if ( !tittle || !id || !label || !categoryCode || !areaCode) return res.status(400).json({
            err: 1,
            mes: 'Missing input'
        })
        const response = await service.createNewPostService(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}


