import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";
const cloudinary = require('cloudinary').v2;

export const getCurrent = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.getCurrent(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const updateInfo = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.updateInfo(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const updateDemandJob = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.updateDemandJob(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const changePassword = async (req, res) =>{
    try {
        const { id } = req.user
        const response = await service.updatePassword(id , req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getCompanies = async (req, res) => {
    try{
        const response = await service.getCompanies()
        return res.status(200).json(response)
    }catch (error){
        return internalServerError(res)
    }
}

export const createCvController = async (req, res) =>{
    try {
        const fileData = req.file;
        console.log(fileData);
        const { id } = req.user;
        if ( !id || !fileData) {
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return res.status(400).json({
                err: 1,
                mes: 'Missing input'
            }
        )}
        const response = await service.createCv(id, fileData)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getUserCvs = async (req, res) => {
    try{
        const { id } = req.user;
        const response = await service.getUserCvs(id)
        return res.status(200).json(response)
    }catch (error){
        return internalServerError(res)
    }
}

export const setCvMain = async (req, res) => {
    try{
        const { id } = req.user;
        const response = await service.setMainCv(id, req.body)
        return res.status(200).json(response)
    }catch (error){
        return internalServerError(res)

    }
}