import db from "../models";
import bcrypt from "bcryptjs";

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
        attributes: ["id", "companyName", "address", "description","staffSize","field_of_activity"],
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
