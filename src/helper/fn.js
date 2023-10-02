import { number } from "joi"

export const generateCode = (value) =>{
    let output = ''
    value = value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split(" ")
        .join("")
    let merge = value + process.env.SECRET_GENERATE
    let length = merge.length
    for (let i = 0; i < 3; i++) {
        let index = i === 2 ? Math.floor(merge.length / 2 + length / 2) : Math.floor(length / 2)
        output += merge.charAt(index)
        length = index
    }
    return `${value.charAt(4)}${value.charAt(0)}${value.charAt(3)}${output}${value.charAt(value.length-1)}`.toUpperCase()  
}


export const generateRandomCode = (length) =>{
    const char = 'abcdefghjklmnopABCDEFGHJKLMNOP'
    const num = '1234567890'
    let code = ''
    for (let i = 0; i < length - 1; i++){
        code += char.charAt(Math.floor(Math.random() * char.length))
    }
    return `${code}${num.charAt(Math.floor(Math.random() * char.length))}`
}

//vd10
