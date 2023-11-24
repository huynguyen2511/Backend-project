import { generateCode } from "../helper/fn";
import db from "../models";
import { v4 as generateId } from "uuid";
import moment from "moment/moment";

export const createNewPostService = (body, employerId, companyId) => new Promise(async (resolve, reject) => {
    try {
      const attributesId = generateId();
      const overviewId = generateId();
      const labelCode = generateCode(body.label);
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const currentDate = new Date();

      const response = await db.JobPost.create({
        id: generateId(),
        title: body.title,
        labelCode,
        attributesId,
        categoryCode: body.categoryCode,
        overviewId,
        employerId: employerId,
        companyId: companyId,
        description: body.description || "",
        provinceCode: body.provinceCode,
        address: body.address,
      });
      await db.Attribute.create({
        id: attributesId,
        salary: body.salary,
        benefits: body.benefits,
        requirements: body.requirements,
        experience: body.experience,
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
        expired: currentDate.setDate(currentDate.getDate() + 10),
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
          { model: db.Attribute, as: "attributes", attributes: ["salary", "published", "hashtag", "benefits", "requirements", "experience", "level", "recruitNumber", "gender"] },
          { model: db.Overview, as: "overview", attributes: ["area", "category", "created", "expired"] },
          { model: db.Employer, as: "employer", attributes: ["name", "email"] },
          { model: db.Company, as: "companyPost", attributes: ["id", "companyName", "staffSize"] },
          { model: db.Province, as: "province", attributes: ["value"] },
        ],
        attributes: ["id", "title", "address", "description"],
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
          { model: db.Attribute, as: "attributes", attributes: ["salary", "published", "hashtag", "benefits", "requirements", "experience", "level", "recruitNumber"] },
          { model: db.Overview, as: "overview", attributes: ["area", "category", "created", "expired"] },
          { model: db.Employer, as: "employer", attributes: ["name", "email"] },
          { model: db.Company, as: "companyPost", attributes: ["id", "companyName", "staffSize"] },
          { model: db.Province, as: "province", attributes: ["value"] },
        ],
        attributes: ["id", "title", "address", "description"],
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
