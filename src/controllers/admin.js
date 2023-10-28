import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";

export const adminLogin = async (req, res) =>{
    try {
        const { email, password} = req.body
        if ( !email || !password) {
            return res.status(400).json({
                err: 1,
                mes: 'Missing input'
            }
        )}
        const response = await service.adminLogin(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const adminRegister = async (req, res) =>{
    try {
        const { username, password, email} = req.body
        console.log(username, password, email);
        if ( !username || !password || !email) {
            return res.status(400).json({
                err: 1,
                mes: 'Missing input'
            }
        )}
        const response = await service.adminRegister(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getEmployers = async (req, res) =>{
    try {
        const response = await service.getEmployers()
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}