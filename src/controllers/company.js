import * as service from "../services"; //vd4
import { internalServerError, badRequest } from "../middleware/handle_error";
import { companyName, phone, email, taxCode, field_of_activity, staffSize, workLocation, district, description } from "../helper/joi_schema";
import joi from "joi";
const cloudinary = require('cloudinary').v2;

export const updateCompany = async (req, res) =>{
    
    try {
        const { companyId } = req.user;
        const response = await service.updateCompany( req.body, companyId)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const updateLicense = async (req, res) =>{
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
        const response = await service.updateLicense(id, fileData)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}


export const getCompanyByEmployer = async (req, res) => {
    try{
        const { companyId } = req.user;
        const response = await service.getCompanyByEmployer(companyId)
        return res.status(200).json(response)
    }catch (error){
        return internalServerError(res)
    }
}

export const getLicenseByEmployer = async (req, res) => {
    try{
        const { id } = req.user;
        const response = await service.getLicenseByEmployer(id)
        return res.status(200).json(response)
    }catch (error){
        return internalServerError(res)
    }
}

