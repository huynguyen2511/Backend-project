import db from '../models'
import data from '../../data/data.json'
import { generateCode } from '../helper/fn' //vd10

export const insertData = () => new Promise( async (resolve, reject) => {
    try {
        const value = Object.values(data)
        value.forEach(async(item) =>{
            await db.Province.create({
                code: item.code,
                value: item.value
            })
        })
        resolve('ok')
    } catch (error) {
        reject(error)
    }
})

export const getProvince=() => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Province.findAll({
            raw: true,
            attributes: ['code', 'value']
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

