import axios from "axios";
import { ApiResponseModel } from "../models/ApiResponseModel";

const getAllEmployees = async (): Promise<ApiResponseModel> => {
  const employees = await axios.get(
    `${process.env.NEXT_PUBLIC_HOST}/api/employee/getAll`
  );
  return {
    data: employees.data,
    success: true,
  };
};
export { getAllEmployees };
