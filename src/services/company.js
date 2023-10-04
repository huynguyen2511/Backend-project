import { generateCode } from '../helper/fn'
import db from '../models'
import { v4 as generateId } from 'uuid'

export const updateCompany = ( body) => new Promise( async (resolve, reject) => {
    try {
        if (!body.id){
            resolve({
                err: 1,
                mes: "Missing id" 
            })
        }else{
            const response = await db.Company.findOne({
                where: {id: body.id}
            })
            if (response){
                response.companyName= body.companyName;
                response.phone = body.phone;
                response.email = body.email || null,
                response.taxCode = body.taxCode || null,
                response.field_of_activity = body.field_of_activity || null,
                response.staffSize = body.staffSize || null,
                response.address = body.address,
                response.provinceCode = generateCode(body.province),
                response.description = body.description || null
                await response.save();
            }
             resolve({
            err:  0,
            mes: 'Updated',
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const updateLicense = ( body ) => new Promise( async (resolve, reject) => {
    try {
        if (!body.id){
            resolve({
                err: 1,
                mes: "Missing id" 
            })
        }else{
            const response = await db.License.findOne({
                where: {id: body.id}
            })
            if (response){
                response.related_documents= body.related_documents;
                response.additional_documents = body.additional_documents;
                response.statusCode = 'S2';
                await response.save();
            }
             resolve({
            err:  0,
            mes: 'Updated',
            })

    

            
        }
    } catch (error) {
        reject(error)
    }
})