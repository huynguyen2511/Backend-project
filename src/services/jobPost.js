import { generateCode } from "../helper/fn";
import db from "../models";
import { v4 as generateId } from "uuid";
import moment from "moment/moment";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

export const createNewPostService = (body, employerId, companyId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = generateId();
      const overviewId = generateId();
      const labelCode = generateCode(body.label);
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const currentDate = new Date();
      const nextDate = new Date();
      const compName = await db.Company.findOne({
        where: {
          id: companyId,
        },
        attributes: ["companyName"],
      });

      const response = await db.JobPost.create({
        id: generateId(),
        title: body.title + " at company " + compName.companyName,
        labelCode,
        attributesId,
        categoryCode: body.categoryCode,
        overviewId,
        employerId: employerId,
        companyId: companyId,
        description: body.description || "",
        provinceCode: body.provinceCode,
        address: body.address,
        salary: body.salary,
        experience: body.experience,
        expired: nextDate.setDate(currentDate.getDate() + 30),
      });
      await db.Attribute.create({
        id: attributesId,
        benefits: body.benefits,
        requirements: body.requirements,
        level: body.level,
        gender: body.gender,
        recruitNumber: body.recruitNumber,
        published: moment(new Date()).format("DD/MM/YYYY"),
        hashtag,
      });
      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        area: body.label,
        category: body.category,
        bonus: "Tin Thuong",
        created: currentDate,
        expired: nextDate.setDate(currentDate.getDate() + 30),
      });
      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body.label,
        },
      });
      console.log(response);
      resolve({
        err: 0,
        mes: "Create post success",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPosts = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.JobPost.findAll({
        raw: true,
        nest: true,
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: [
              "published",
              "hashtag",
              "benefits",
              "requirements",
              "level",
              "recruitNumber",
              "gender",
            ],
          },
          {
            model: db.Employer,
            as: "employer",
            attributes: ["id", "name", "email"],
          },
          {
            model: db.Overview,
            as: "overview",
            attributes: ["area", "category", "created", "expired"],
          },
          {
            model: db.Company,
            as: "companyPost",
            attributes: ["id", "companyName", "staffSize"],
          },
          { model: db.Province, as: "province", attributes: ["value"] },
        ],
        attributes: [
          "id",
          "title",
          "address",
          "description",
          "salary",
          "experience",
          "expired"
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Get all post failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsByEmployer = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.JobPost.findAll({
        where: {
          employerId: id,
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.Attribute,
            as: "attributes",
            attributes: [
              "published",
              "hashtag",
              "benefits",
              "requirements",
              "level",
              "recruitNumber",
              "gender",
            ],
          },
          {
            model: db.Overview,
            as: "overview",
            attributes: ["area", "category", "created", "expired"],
          },
          { model: db.Employer, as: "employer", attributes: ["name", "email"] },
          {
            model: db.Company,
            as: "companyPost",
            attributes: ["id", "companyName", "staffSize"],
          },
          { model: db.Province, as: "province", attributes: ["value"] },
        ],
        attributes: [
          "id",
          "title",
          "address",
          "description",
          "salary",
          "experience",
          "expired"
        ],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Get all post failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getSearchedPosts = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(params.province);
      const position = params.position;
      const provinceCode = params.province;
      const workExperience = params.workExperience;
      const salary = params.salary;
      const options = {
        where: {},
      };

      if (position != 'null') {
        options.where.title = { [Op.like]: `%${position}%` };
      }
      if (provinceCode != 'null') {
        options.where.provinceCode = provinceCode;
      }
      if (workExperience != 'null') {
        options.where.experience = workExperience;
      }
      if (salary != 'null') {
        options.where.salary = salary;
      }
      console.log(options);
      const response = await db.JobPost.findAll(options);
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Get all post failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
