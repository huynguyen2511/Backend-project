import db from '../models'
import { v4 as generateId } from 'uuid'

export const createCompany = (body, employerId) => new Promise( async (resolve, reject) => {
    console.log(body , employerId);
    try {
        const response = await db.Company.create({

      
                id: generateId(),
                employerId,
                companyName: body.companyName,
                phone: body.phone,
                email: body.email,
                taxCode: body.taxCode,
                field_of_activity: body.field_of_activity,
                staffSize: body.staffSize,
                workLocation: body.workLocation,
                district: body.district,
                description: body.description || null,
       
        })
        
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Created' : 'Cannot create new company',
        })
    } catch (error) {
        reject(error)
    }
})