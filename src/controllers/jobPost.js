import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";



export const createNewPost = async (req, res) =>{
    try {
        // const { error } = joi.object({ id }).validate(req.body)
        // if(error) return badRequest(error.details[0]?.message, res)
        // const {id , tittle, label , categoryCode , category, province, salary , benefits, requirements} = req.body
        // if ( !tittle || !id || !label || !categoryCode || !category || !province || !salary || !benefits || !requirements) return res.status(400).json({
        //     err: 1,
        //     mes: 'Missing input'
        // })
        const response = await service.createNewPostService(req.body)
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


