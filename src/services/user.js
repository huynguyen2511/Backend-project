import db from "../models";
import bcrypt from "bcryptjs";
const cloudinary = require('cloudinary').v2;
import moment from "moment/moment";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

export const getCurrent = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
        attributes: {
          exclude: ["password", "role_code"],
        },
        include: [
          { model: db.Role, as: "roleData", attributes: ["code", "value"] },
          { model: db.UserCv, as: "userCvs", attributes: ["id", "cv_document", "published","status"] },
        ],
      });

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Got" : "User not found",
        userData: response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateInfo = (userId, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
      });
      if (response) {
        response.name = body.name;
        response.phone = body.phone;
        await response.save();
      }
      resolve({
        err: 0,
        mes: "Updated",
      });
    } catch (error) {
      reject(error);
    }
  });

export const updateDemandJob = (userId, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
      });
      if (response) {
        response.avatar = body.avatar || "";
        response.birthYear = body.birthYear;
        response.gender = body.gender;
        response.profession = body.profession;
        response.experience = body.experience;
        response.qualification = body.qualification;
        response.engLevel = body.engLevel;
        response.workLocation = body.workLocation;
        response.workForm = body.workForm;
        response.desiredSalary = body.desiredSalary;
        response.homeTown = body.homeTown || "";
        response.wishes = body.wishes || "";
        response.introduce = body.introduce || "";
        await response.save();
      }
      resolve({
        err: 0,
        mes: "Updated",
      });
    } catch (error) {
      reject(error);
    }
  });

export const updatePassword = (userId, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      const isChecked =
        response && bcrypt.compareSync(body.password, response.password);

      const newPass = isChecked ? hashPassword(body.newPassword) : null;

      resolve({
        err: newPass ? 0 : 1,
        mes: newPass ? "Password change successfully" : "Wrong password",
      });
      if (newPass) {
        await db.User.update(
          {
            password: newPass,
          },
          {
            where: { id: response.id },
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });

export const getCompanies = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Company.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Province, as: "province", attributes: ["value"] },
        ],
        attributes: [
          "id",
          "companyName",
          "address",
          "description",
          "staffSize",
          "field_of_activity",
          "phone",
          "email"
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Get all company failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const createCv = (id, link) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.UserCv.create({
        userId: id,
        cv_name: link?.originalname,
        cv_document: link?.path,
        status: "Off",
        findStatus: "Off",
        published: moment(new Date()).format("DD/MM/YYYY")
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Cv upload successfully" : "Failed to upload Cv",
        response,
      });
    } catch (error) {
      reject(error);
      if (fileData) cloudinary.uploader.destroy(fileData.filename);
    }
  });

export const getUserCvs = (id) => new Promise(async(resolve, reject) =>{
    try{
        const response = await db.UserCv.findAll({
            where: {
                userId: id
            },
            raw: true,
            nest: true,
           
            attributes: ['id', 'cv_name', 'cv_document', 'status', 'findStatus', 'published']
        })
        resolve({
            err: response? 0 : 1,
            mes: response? 'Ok' : 'Get Cvs failed.',
            response
        })
    }catch (error) {
        reject(error)
    }
})

export const setMainCv = (userId, body) => new Promise(async(resolve, reject) =>{
  try{
    await db.UserCv.update({status: "Off"},{
      where: {
        userId: userId,
      }
    })
    const response = await db.UserCv.update({status: "On"},{
      where:{
        id: body.cvId
      }
    })
    resolve({
      err: response? 0 : 1,
      mes: response? 'Ok' : 'Set main Cv failed.',
      response
  })
  }catch (error) {
    reject(error)
  }
})

export const getCompanyByName = (query) =>
  new Promise(async (resolve, reject) => {
    try {
      const name = query.companyName;
      const response = await db.Company.findAll({
        where:{
          companyName: { [Op.like]: `%${name}%` }
        },
        raw: true,
        nest: true,
        include: [
          { model: db.Province, as: "province", attributes: ["value"] },
        ],
        attributes: [
          "id",
          "companyName",
          "address",
          "description",
          "staffSize",
          "field_of_activity",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Get all company failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

  export const deleteCv = (body) => new Promise(async(resolve, reject) =>{
    try{
      const response = await db.UserCv.destroy({
        where:{
          id: body.cvId
        }
      })
      resolve({
        err: response > 0 ? 0 : 1,
        mes: response > 0 ? 'Deleted' : 'delete Cv failed.',
        response
    })
    }catch (error) {
      reject(error)
    }
  })