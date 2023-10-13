import db from '../models'

export const getOneEmployer = (employerId) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Employer.findOne({
            where: { id: employerId },
            attributes: ['name', 'email', 'gender', 'phone', 'jobPosition', 'avatar']
        })
        
        resolve({
            // err: response ? 0 : 1,
            // mes: response ? 'Got' : 'Employer not found',
            response
        })
    } catch (error) {
        reject(error)
    }
})


export const updateEmployer=(body , userId) => new Promise( async (resolve, reject) => {

    try {
        const response = await db.Employer.findOne({
            where: {id: userId}
        })
        if (response){
            response.name= body.name;
            response.phone = body.phone;
            response.gender = body.gender,
            response.jobPosition = body.jobPosition,
            await response.save();
        }
        resolve({
        err:  0,
        mes: 'Updated',
        })
    } catch (error) {
        reject(error)
    }
})