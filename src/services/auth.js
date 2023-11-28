import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { notAuth } from '../middleware/handle_error';
import { generateCode } from '../helper/fn';
import { Op } from 'sequelize';
import { v4 as generateId } from 'uuid'

const salt = bcrypt.genSaltSync(10);
const hashPassword = password => bcrypt.hashSync(password, salt);

export const register = (body) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email: body.email },
            defaults: {
                id: generateId(),
                name: body.name,
                email: body.email,
                password: hashPassword(body.password)
            }
        })
        const accessToken = response[1] ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code},
             process.env.JWT_SECRET, {expiresIn: '10s'}) : null
        //JWT_SECRET_REFRESH_TOKEN
        const refreshToken = response[1] 
        ? jwt.sign({id: response[0].id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: '1d'}) 
        : null

        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'REgister successfully' : 'Email is already in use',
            'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
            'refresh_token': refreshToken
        })

        if(refreshToken) {
            await db.User.update({
                refresh_token: refreshToken
            }, {
                where: {id: response[0].id}
            })
        }
    } catch (error) {
        reject(error)
    }
})

export const login = ({email, password}) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(password, response.password)
        const token = isChecked 
        ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '1d'}) 
        : null
        //JWT_SECRET_REFRESH_TOKEN
        const refreshToken = isChecked
        ? jwt.sign({id: response.id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: '7d'}) 
        : null

        resolve({
            err: token ? 0 : 1,
            mes: token ? 'Login successfully' : response ? 'Wrong password' : 'Email has not been registered',
            'access_token': token ? `Bearer ${token}` : token,
            'refresh_token': refreshToken
        })

        if(refreshToken) {
            await db.User.update({
                refresh_token: refreshToken
            }, {
                where: {id: response.id}
            })
        }
    } catch (error) {
        reject(error)
    }
})




/** ####### Employer ####### */




export const employerRegister = (body) => new Promise( async (resolve, reject) => {
    try {
        const employerId = generateId()
        const companyId = generateId()
        const response = await db.Employer.findOrCreate({
            where: { email: body.email },
            defaults: {
                id: employerId,
                companyId,
                name: body.name,
                email: body.email,
                password: hashPassword(body.password),
                gender: body.gender,
                phone: body.phone,
                jobPosition: body.jobPosition
            }
        })
        await db.Company.create({
            id: companyId,
            companyName: body.companyName,
            phone: null,
            email: null,
            taxCode: null,
            field_of_activity: null,
            staffSize: null,
            address: body.address,
            provinceCode: body.provinceCode
        })
        await db.License.create({
            employerId,
            additional_documents: null,

        })
        //Generate token
        const accessToken = response[1] ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code},
             process.env.JWT_SECRET, {expiresIn: '10s'}) : null
        //JWT_SECRET_REFRESH_TOKEN
        const refreshToken = response[1] 
        ? jwt.sign({id: response[0].id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: '1d'}) 
        : null
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'REgister successfully' : 'Email is already in use',
            'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
            'refresh_token': refreshToken
        })

        if(refreshToken) {
            await db.Employer.update({
                refresh_token: refreshToken
            }, {
                where: {id: response[0].id}
            })
        }
    } catch (error) {
        reject(error)
    }
})


export const employerLogin = ({email, password}) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Employer.findOne({
            where: { email },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(password, response.password)
        const token = isChecked 
        ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code, companyId: response.companyId}, process.env.JWT_SECRET, {expiresIn: '1d'}) 
        : null
        //JWT_SECRET_REFRESH_TOKEN
        const refreshToken = isChecked 
        ? jwt.sign({id: response.id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: '15d'}) 
        : null

        resolve({
            err: token ? 0 : 1,
            mes: token ? 'Login successfully' : response ? 'Wrong password' : 'Email has not been registered',
            'access_token': token ? `Bearer ${token}` : token,
            'refresh_token': refreshToken
        })

        if(refreshToken) {
            await db.Employer.update({
                refresh_token: refreshToken
            }, {
                where: {id: response.id}
            })
        }
    } catch (error) {
        reject(error)
    }
})



export const refreshToken = ( refresh_token ) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { refresh_token }
        })
        if (response){
            console.log('1' + response);
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN, (err) =>{
                if (err) {
                    resolve({
                        err: 1,
                        mes: 'Phien dang nhap het han!!!'
                    })
                }
                else{
                    const accessToken = jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '1h'})
                    resolve({
                        err: accessToken ? 0 : 1,
                        mes: accessToken ? 'Ok' : 'Tao token moi that bai',
                        'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
                        'refresh_token' : refresh_token
                    })
                }
            })
        }

        
    } catch (error) {
        reject(error)
    }
})


// if(!response){
        //     const response = await db.Employer.findOne({
        //         where: {refresh_token}
        //     })
        //     if(response){
        //         jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN, (err) =>{
        //             if (err) {
        //                 resolve({
        //                     err: 1,
        //                     mes: 'Phien dang nhap het han!!!'
        //                 })
        //             }
        //             else{
        //                 const accessToken = jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '10s'})
        //                 resolve({
        //                     err: accessToken ? 0 : 1,
        //                     mes: accessToken ? 'Ok' : 'Tao token moi that bai',
        //                     'access_token': token ? `Bearer ${token}` : token,
        //                     'refresh_token' : refresh_token
        //                 })
        //             }
        //         })
        //     }
        // } else 