import db from '../models'
import data from '../../data/data.json'
import { generateCode } from '../helper/fn' //vd10

export const insertData = () => new Promise( async (resolve, reject) => {
    try {
        const value = Object.keys(data)
        value.forEach(async(item) =>{
            await db.Province.create({
                code: generateCode(item),
                value: item
            })
        })
        resolve('ok')
    } catch (error) {
        reject(error)
    }
})

