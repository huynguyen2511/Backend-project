import { generateCode } from '../helper/fn'
import db from '../models'
import { v4 as generateId } from 'uuid'
import moment from 'moment/moment'


export const createNewPostService = ( body, id) => new Promise( async (resolve, reject) => {
    try {
        const attributesId = generateId()
        const overviewId = generateId()
        const labelCode = generateCode(body.label)
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10,6))}`
        const currentDate = new Date()

        const response = await db.JobPost.create({
            id: generateId(),
            title: body.title || null,
            labelCode,
            attributesId,
            categoryCode: body.categoryCode || null,
            overviewId,
            employerId: id,
            description: body.description || null,
            areaCode: body.areaCode || null,
            provinceCode: body.provinceCode || null,
            address: body.address || null
        })
        await db.Attribute.create({
            id: attributesId,
            salary: body.salary,
            benefits: body.benefit,
            requirements: body.requirement,
            published: moment(new Date).format('DD/MM/YYYY'),
            hashtag
        })
        await db.Overview.create({
            id: overviewId,
            code: hashtag,
            area: body.label,
            category: body.category,
            bonus: 'Tin Thuong',
            created: currentDate,
            expired: currentDate.setDate(currentDate.getDate() + 10),
        })
        await db.Label.findOrCreate({
            where: {
                code: labelCode
            },
            defaults: {
                code: labelCode,
                value: body.label
            }
        })
        await db.Province.findOrCreate({
            where:{
                value: province
            },
            defaults:{
                code: generateCode(province),
                value: province
            }
        })
        resolve({
        err:  0,
        mes: 'Create post success',
    })
        
    } catch (error) {
        reject(error)
    }
})