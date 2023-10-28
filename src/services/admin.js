import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { notAuth } from '../middleware/handle_error';
import { generateCode } from '../helper/fn';
import { Op } from 'sequelize';
import { v4 as generateId } from 'uuid'

const salt = bcrypt.genSaltSync(10);
const hashPassword = password => bcrypt.hashSync(password, salt);

export const adminLogin = (body) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Admin.findOne({
            where: { email: body.email},
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(body.password, response.password)
        const token = isChecked 
        ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '1d'}) 
        : null
        
        resolve({
            err: token ? 0 : 1,
            mes: token ? 'Login successfully' : response ? 'Wrong password' : 'Email chua dc dang ki',
            'access_token': token ? `Bearer ${token}` : token,

        })

    } catch (error) {
        reject(error)
    }
})

export const adminRegister = (body) => new Promise( async (resolve, reject) => {
    console.log(body.username, body.email, body.password);
    try {
        const response = await db.Admin.findOrCreate({
            where: { email : body.email},
            defaults: {
                username: body.username,
                email: body.email,
                password: hashPassword(body.password)
            }
        })
        console.log(response);
        const accessToken = response[1] 
        ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn: '10s'}) 
        : null

        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'REgister successfully' : 'Email da duoc dung',
            'access_token': accessToken ? `Bearer ${accessToken}` : accessToken,
        })
    } catch (error) {
        reject(error)
    }
})


export const getEmployers = () => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Employer.findAll({
            raw: true,
            nest: true,
            include: [
                {model: db.Company, as: 'employerComp', attributes:['companyName']},
                {model: db.Status, as: 'statusData', attributes:['value']},
                {model: db.License, as: 'employerLicense', attributes:['statusCode']},
            ],
            attributes: ['name', 'email', 'gender', 'phone', 'jobPosition', 'avatar', 'statusCode']
        })
        
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'Employer not found',
            response
        })
    } catch (error) {
        reject(error)
    }
})

export const getUsers = () => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findAll({
            raw: true,
            nest: true,
            attributes: ['name', 'email', 'phone', 'avatar']
        })
        
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'User not found',
            response
        })
    } catch (error) {
        reject(error)
    }
})