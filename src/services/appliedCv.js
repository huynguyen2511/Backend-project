import db from "../models";
import moment from "moment/moment";

export const createAppliedCv = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const userCv = await db.UserCv.findOne({
        where: {
          userId: userId,
          status: "On",
        },
        attributes: ["id"],
      });

      const response = await db.AppliedCv.create({
        userId: userId,
        userCvId: userCv.id,
        employerId: body.employerId,
        jobPostId: body.jobPostId,
        dateApply: moment(new Date()).format("DD/MM/YYYY"),
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Applied fail",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const reApply = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(body);
      const userCv = await db.UserCv.findOne({
        where: {
          userId: userId,
          status: "On",
        },
        attributes: ["id"],
      });
      const response = await db.AppliedCv.update(
        {
          userCvId: userCv.id,
          status: "Sent",
          dateApply: moment(new Date()).format("DD/MM/YYYY"),
        },
        { where: { userId: userId, jobPostId: body.jobPostId } }
      );
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Update fail",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAppliedCvByUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.AppliedCv.findAll({
        where: {
          userId: id,
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.JobPost,
            as: "postAppliedCv",
            attributes: ["id", "title", "address"],
          },
        ],
        attributes: ["id", "status", "dateApply"],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Get applied posts failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getAppliedCvByEmployer = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.AppliedCv.findAll({
        where: {
          employerId: id,
        },
        raw: true,
        nest: true,
        include: [
          {
            model: db.JobPost,
            as: "postAppliedCv",
            attributes: ["id", "title"],
          },
          {
            model: db.User,
            as: "userAppliedCv",
            attributes: ["id", "name", "email"],
          },
          {
            model: db.UserCv,
            as: "cvAppliedCv",
            attributes: ["id", "cv_document"],
          },
        ],
        attributes: ["id", "status", "dateApply"],
      });
      resolve({
        err: response ? 0 : 1,
        mes: response ? "Ok" : "Get applied posts failed.",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const setStatusAppliedCv = (body) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.AppliedCv.findOne({
        where: { id: body.id },
      });
      if (response) {
        response.status = body.status;
        await response.save();
        resolve({
          err: 0,
          mes: "Updated",
          response,
        });
      } else {
        resolve({
          err: 1,
          mes: "Set status fail",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
