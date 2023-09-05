import db from '../models'

export const getOne = (userId) => new Promise( async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id: userId },
            attributes: {
                exclude: ['password', 'role_code']
            },
            include: [
                {model: db.Role, as: 'roleData', attributes: ['id', 'code', 'value']}
            ]
        })
        
        resolve({
            err: response ? 0 : 1,
            mes: response ? 'Got' : 'User not found',
            userData: response
        })
    } catch (error) {
        reject(error)
    }
})

// export const login = ({email, password}) => new Promise( async (resolve, reject) => {
//     try {
//         const response = await db.User.findOne({
//             where: { email },
//             raw: true
//         })
//         const isChecked = response && bcrypt.compareSync(password, response.password)
//         const token = isChecked ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, {expiresIn: '5d'}) : null

//         resolve({
//             err: token ? 0 : 1,
//             mes: token ? 'Login successfully' : response ? 'Wrong password' : 'Email chua dc dang ki',
//             'access_token': token ? `Bearer ${token}` : token
//         })

//         resolve({
//             err: 0,
//             mes: 'login service'
//         })
//     } catch (error) {
//         reject(error)
//     }
// })