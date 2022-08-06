import { sendAbsenceModel } from "../models/GheyabModels";
import axios from "../utils/axios";

const sendAbsence = async (model: sendAbsenceModel[]) => {
  try {
    const res = await axios({
      method: "post",
      url: "/absence/create",
      data: model,
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    return res;
  } catch (e) {
    return e;
  }
};

const getAbsence = async (checkDate: Date) => {
  try {
    const res = await axios({
      method: "post",
      url: "/absence/get",
      data: {
        DateToCheck: checkDate,
      },
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
    return res;
  } catch (e) {
    return e;
  }
};

const AbsenceServices = {
  sendAbsence,
  getAbsence,
};

export default AbsenceServices;
