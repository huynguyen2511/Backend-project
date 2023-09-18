import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const salt = bcrypt.genSaltSync(10);
const hashPassword = password => bcrypt.hashSync(password, salt);

export const register = ({name, email, password}) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { email },
            defaults: {
                name,
                email,
                password: hashPassword(password)
            }
        })
        console.log(response);
        const token = response[1] ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn: '5d'}) : null

        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'REgister successfully' : 'Email da duoc dung',
            'access_token': token ? `Bearer ${token}` : token
        })
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
        const token = isChecked ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '5d'}) : null

        resolve({
            err: token ? 0 : 1,
            mes: token ? 'Login successfully' : response ? 'Wrong password' : 'Email chua dc dang ki',
            'access_token': token ? `Bearer ${token}` : token
        })

        resolve({
            err: 0,
            mes: 'login service'
        })
    } catch (error) {
        reject(error)
    }
})


/** Employer */

export const employerRegister = ({name, email, password, sex, phone, jobPosition, workLocation, district}) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.Employer.findOrCreate({
            where: { email },
            defaults: {
                name,
                email,
                password: hashPassword(password),
                sex,
                phone,
                jobPosition,
                workLocation,
                district
            }
        })
        console.log(response);
        const token = response[1] ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn: '5d'}) : null

        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'REgister successfully' : 'Email da duoc dung',
            'access_token': token ? `Bearer ${token}` : token
        })
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
        const token = isChecked ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '5d'}) : null

        resolve({
            err: token ? 0 : 1,
            mes: token ? 'Login successfully' : response ? 'Wrong password' : 'Email chua dc dang ki',
            'access_token': token ? `Bearer ${token}` : token
        })

        resolve({
            err: 0,
            mes: 'login service'
        })
    } catch (error) {
        reject(error)
    }
})