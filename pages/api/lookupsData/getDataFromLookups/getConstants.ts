// this endpoint will return the Insurance Percentages, hafez and khasm ratios and the working hours
import { NextApiRequest, NextApiResponse } from "next";
import gethafezAndKhasmRatiosEndpoint from "../../../../controllers/getHafezAndKhasmRatios";
import getWorkingHours from "../../../../controllers/getWorkingHours";
import { getInsurancePercentageRatio } from "../../../../controllers/InsuranceController";

// http://localhost:3000/api/lookupsData/getDataFromLookups/getConstants

const getAllNeededConstants = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // todo : we will send each one of the needed constants in the response
  const getInsurancePercentageEndpoint = await getInsurancePercentageRatio();
  const InsuranceBySherkaPercentage =
    getInsurancePercentageEndpoint.percentageRatioOfSherka;
  const InsuranceByPersonPercentage =
    getInsurancePercentageEndpoint.percentageRatioOfPerson;

  const getWorkingHoursEndpoint = await getWorkingHours();
  const { StartTime, EndTime, NumberOfWorkingHours } = getWorkingHoursEndpoint;

  const getHafezAndKhasmConstants = await gethafezAndKhasmRatiosEndpoint();
  const { hafezHourRatio, khasmHourRatio, hafezDayRatio, khasmDayRatio, id } =
    getHafezAndKhasmConstants;

  res.status(200).json({
    SherkaInsurancePercentage: InsuranceBySherkaPercentage,
    PersonInsurancePercentage: InsuranceByPersonPercentage,
    startHour: StartTime,
    endHour: EndTime,
    idOfHafezAndKhasmRatios: id,
    HafezExtraHourRatio: hafezHourRatio,
    KhasmLateHourRatio: khasmHourRatio,
    HafezExtraDayRatio: hafezDayRatio,
    KhasmLateDayRatio: khasmDayRatio,
    NumberOfWorkingHours: NumberOfWorkingHours,
  });
};

export default getAllNeededConstants;
