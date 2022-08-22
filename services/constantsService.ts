import { ApiResponseModel } from "../models/ApiResponseModel";
import axios from "../utils/axios";

export const getMohafzatService = async (): Promise<ApiResponseModel> => {
  const response = await axios.get(
    "/api/lookupsData/getDataFromLookups/mohafazat"
  );
  if (response.data) {
    const agazat = response.data.map(
      (item: { MohafzaID: number; MohafzaName: string }) => {
        return { id: item.MohafzaID, name: item.MohafzaName };
      }
    );
    return {
      data: agazat,
      success: true,
    };
  } else {
    return {
      data: [],
      success: false,
    };
  }
};

export const getManateqService = async (): Promise<ApiResponseModel> => {
  const response = await axios.get(
    "/api/lookupsData/getDataFromLookups/manateq"
  );
  if (response.data) {
    const manateq = response.data.map(
      (manteqa: { ManteqaID: number; ManteqaName: string }) => {
        return { id: manteqa.ManteqaID, name: manteqa.ManteqaName };
      }
    );
    return {
      data: manateq,
      success: true,
    };
  } else {
    return {
      data: [],
      success: false,
    };
  }
};

export const getManateqByMohafzaIdService = async (
  mohafzaId: number
): Promise<ApiResponseModel> => {
  const response = await axios.get(
    `/api/lookupsData/getDataFromLookups/getManateqByMohafzaID?mohafzaID=${mohafzaId}`
  );
  if (response.data.length > 0) {
    const manateq = response.data.map(
      (manteqa: {
        ManteqaID: number;
        ManteqaName: string;
        Manteqa_MohafzaID: number;
      }) => {
        return {
          id: manteqa.ManteqaID,
          name: manteqa.ManteqaName,
          mohafzaId: manteqa.Manteqa_MohafzaID,
        };
      }
    );
    return {
      data: manateq,
      success: true,
    };
  } else {
    return {
      data: [],
      success: false,
    };
  }
};
