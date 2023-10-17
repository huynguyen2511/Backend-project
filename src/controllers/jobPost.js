import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";



export const createNewPost = async (req, res) =>{
    try {
        const {id , companyId} = req.user
        const response = await service.createNewPostService(req.body, id, companyId)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getPosts = async (req, res) => {
    try{
        const response = await service.getPosts()
        return res.status(200).json(response)
    }catch (error){
        return internalServerError(res)
    }
}

export const getPostsByEmployer = async (req, res) => {
    try{
        const { id } = req.user;
        const response = await service.getPostsByEmployer(id)
        return res.status(200).json(response)
    }catch (error){
        return internalServerError(res)
    }
}


