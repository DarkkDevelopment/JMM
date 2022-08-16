import axios from "axios";
import { ApiResponseModel } from "../models/ApiResponseModel";
import employeeFormValidator from "./validators/employeeFormValidator";

const getAllEmployees = async (): Promise<ApiResponseModel> => {
  const employees = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/employee/getAll`
  );
  return {
    data: employees.data,
    success: true,
  };
};

const sendEmployee = async (employee: any): Promise<ApiResponseModel> => {
  try {
    console.log(employee);
    const valid = employeeFormValidator(employee);
    if (!valid.response)
      return {
        data: null,
        success: false,
        message: valid.message,
      };
    const response = await axios.post(
      "/api/HR_Endpoints/employee/create",
      employee
    );

    if (response.status === 200)
      return {
        data: "",
        success: true,
      };
    else
      return {
        data: "",
        success: false,
        message: "حدث خطأ ما",
      };
  } catch (e) {
    return {
      data: e,
      success: false,
      message: "حدث خطأ ما",
    };
  }
};
export { getAllEmployees, sendEmployee };
