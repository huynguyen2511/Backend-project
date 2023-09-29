import db from '../models'

export const getOneEmployer = (employerId) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Employer.findOne({
            where: { id: employerId },
            attributes: {
                exclude: ['password', 'role_code']
            }
    
        })
        
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'Employer not found',
            userData: response
        })
    } catch (error) {
        reject(error)
    }
})
