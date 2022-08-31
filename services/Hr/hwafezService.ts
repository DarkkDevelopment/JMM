import { ApiResponseModel } from "../../models/ApiResponseModel";
import axios from "../../utils/axios";

const getHwafezService = async (year: number): Promise<ApiResponseModel> => {
  const response = await axios({
    method: "POST",
    url: "/api/HR_Endpoints/hawafez/get",
    data: {
      year,
    },
  });
  return {
    data: response.data,
    success: response.status == 200,
  };
};

export { getHwafezService };
