import { generateCode } from '../helper/fn'
import db from '../models'
import { v4 as generateId } from 'uuid'
const cloudinary = require('cloudinary').v2;

export const updateCompany = ( body, companyId ) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Company.findOne({
            where: {id: companyId}
        })
        if (response){
            response.companyName= body.companyName;
            response.phone = body.phone;
            response.email = body.email || null,
            response.taxCode = body.taxCode || null,
            response.field_of_activity = body.field_of_activity || null,
            response.staffSize = body.staffSize || null,
            response.address = body.address,
            response.description = body.description || null
            await response.save();

            resolve({
                err:  0,
                mes: 'Updated',
            })
        }else{
            resolve({
                err:  1,
                mes: 'Update fail',
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const updateLicense = (id, link) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.License.findOne({
            where: {employerId: id}
        })
        if (response){
            response.related_documents= link?.path;
            // response.additional_documents = body.additional_documents;
            response.statusCode = 'S2';
            await response.save();
            resolve({
                err:  0,
                mes: 'Updated',
            })
        }else{
            resolve({
                err:  1,
                mes: 'Updated fail',
            })
        }
    } catch (error) {
        reject(error)
        if(fileData) cloudinary.uploader.destroy(fileData.filename)
    }
})

export const getCompanyByEmployer = (companyId) => new Promise(async(resolve, reject) =>{
    try{
        const response = await db.Company.findOne({
            where: {
                id: companyId
            },
            raw: true,
            nest: true,
            include: [
                {model: db.Employer, as: 'employerComp', attributes:['name', 'email']},
            ],
            attributes: ['id', 'companyName', 'phone', 'email', 'taxCode', 'field_of_activity', 'staffSize', 'address', 'description' ]
        })
        resolve({
            err: response? 0 : 1,
            mes: response? 'Ok' : 'Get company failed.',
            response
        })
    }catch (error) {
        reject(error)
    }
})

export const getLicenseByEmployer = (id) => new Promise(async(resolve, reject) =>{
    try{
        const response = await db.License.findOne({
            where: {
                employerId: id
            },
            raw: true,
            nest: true,
            include: [
                {model: db.Employer, as: 'employerLicense', attributes:['name', 'email']},
                {model: db.Status, as: 'statusData', attributes:['value']},
            ],
            attributes: ['id', 'related_documents', 'additional_documents', 'statusCode']
        })
        resolve({
            err: response? 0 : 1,
            mes: response? 'Ok' : 'Get license failed.',
            response
        })
    }catch (error) {
        reject(error)
    }
})
