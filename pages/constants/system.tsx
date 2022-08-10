import axios from "axios";
import { AppProps } from "next/dist/shared/lib/router/router";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/sideBar";
import { SystemConstantsRow } from "../../components/SystemConstantsRow";
import { InferGetServerSidePropsType } from "next";
import { NEXT_PUBLIC_HOST } from "../../config/config";

const System = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const ourStartHour = props.Time.startHour;
  const ourEndHour = props.Time.endHour;
  const ourHafezExtraHourRatio = props.hafezAndkhasmRatios.hafezExtraHourRatio;
  const ourKhasmLateHourRatio = props.hafezAndkhasmRatios.khasmLateHourRatio;
  const ourHafezExtraDayRatio = props.hafezAndkhasmRatios.hafezExtraDayRatio;
  const ourKhasmLateDayRatio = props.hafezAndkhasmRatios.khasmLateDayRatio;
  const ourPersonInsurancePercentage =
    props.InsurancePercentage.personInsurancePercentage;
  const ourCompanyInsurancePercentage =
    props.InsurancePercentage.companyInsurancePercentage;
  const ourLoanPercentage = props.loanPercentage.loanPercentage;

  console.log(props);

  const [hafezExtraDayRatio, setHafezExtraDayRatio] = useState<string | number>(
    ourHafezExtraDayRatio
  );
  const [hafezExtraHourRatio, setHafezExtraHourRatio] = useState<
    string | number
  >(ourHafezExtraHourRatio);
  const [khasmLateDayRatio, setKhasmLateDayRatio] = useState<string | number>(
    ourKhasmLateDayRatio
  );
  const [khasmLateHourRatio, setKhasmLateHourRatio] = useState<string | number>(
    ourKhasmLateHourRatio
  );
  const [personInsurancePercentage, setPersonInsurancePercentage] = useState<
    string | number
  >(ourPersonInsurancePercentage);
  const [companyInsurancePercentage, setCompanyInsurancePercentage] = useState<
    string | number
  >(ourCompanyInsurancePercentage);
  const [startHour, setStartHour] = useState<string>(ourStartHour);
  const [endHour, setEndHour] = useState<string>(ourEndHour);

  const [loanPercentage, setLoanPercentage] = useState<string | number>(
    ourLoanPercentage
  );
  const [isHafezAndKhasmNew, setIsHafezAndKhasmNew] = useState(false);
  const [isInsuranceNew, setIsInsuranceNew] = useState(false);
  const [isTimeNew, setIsTimeNew] = useState(false);
  const [isLoanPercentageNew, setIsLoanPercentageNew] = useState(false);

  useEffect(() => {
    const checkForValues = () => {
      if (ourStartHour === "" && ourEndHour === "") {
        setIsTimeNew(true);
      } else {
        setIsTimeNew(false);
      }
      if (
        ourHafezExtraDayRatio === 0 &&
        ourHafezExtraHourRatio === 0 &&
        ourKhasmLateDayRatio === 0 &&
        ourKhasmLateHourRatio === 0
      ) {
        setIsHafezAndKhasmNew(true);
      } else {
        setIsHafezAndKhasmNew(false);
      }
      if (
        ourPersonInsurancePercentage === 0 &&
        ourCompanyInsurancePercentage === 0
      ) {
        setIsInsuranceNew(true);
      } else {
        setIsInsuranceNew(false);
      }
      if (ourLoanPercentage === 0) {
        setIsLoanPercentageNew(true);
      } else {
        setIsLoanPercentageNew(false);
      }
    };
    checkForValues();
  }, [
    ourCompanyInsurancePercentage,
    ourEndHour,
    ourHafezExtraDayRatio,
    ourHafezExtraHourRatio,
    ourKhasmLateDayRatio,
    ourKhasmLateHourRatio,
    ourLoanPercentage,
    ourPersonInsurancePercentage,
    ourStartHour,
  ]);

  const onHafezDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHafezExtraDayRatio(e.target.value);
  };

  const onHafezHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHafezExtraHourRatio(e.target.value);
  };

  const onKhasmLateDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKhasmLateDayRatio(e.target.value);
  };

  const onKhasmLateHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKhasmLateHourRatio(e.target.value);
  };

  const onPersonInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonInsurancePercentage(e.target.value);
  };
  const onPersonLoanPercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoanPercentage(e.target.value);
  };

  const onCompanyInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInsurancePercentage(e.target.value);
  };

  const editHafezAndKahsm = async () => {
    await axios.post(
      "/api/lookupsData/updateDataIntoLookups/hafezKhasmRatios",
      {
        hafezDayRatio: Number.parseFloat(hafezExtraDayRatio.toString()),
        hafezHourRatio: Number.parseFloat(hafezExtraHourRatio.toString()),
        khasmDayRatio: Number.parseFloat(khasmLateDayRatio.toString()),
        khasmHourRatio: Number.parseFloat(khasmLateHourRatio.toString()),
        idOfHafezKhasmRatios: 1,
      }
    );
  };

  const addHafezAndKahsm = async () => {
    await axios.post(
      "/api/lookupsData/insertDataIntoLookups/hafezKhasmRatios",
      {
        hafezDayRatio: Number.parseFloat(hafezExtraDayRatio.toString()),
        hafezHourRatio: Number.parseFloat(hafezExtraHourRatio.toString()),
        khasmDayRatio: Number.parseFloat(khasmLateDayRatio.toString()),
        khasmHourRatio: Number.parseFloat(khasmLateHourRatio.toString()),
      }
    );
  };

  const editInsurance = async () => {
    await axios.post(
      "/api/lookupsData/updateDataIntoLookups/insurancePercentages",
      {
        insurancePercentageByPerson: Number.parseFloat(
          personInsurancePercentage.toString()
        ),
        insurancePercentageBySherka: Number.parseFloat(
          companyInsurancePercentage.toString()
        ),
        idOfInsurance: 1,
      }
    );
  };
  const addLoanPercentage = async () => {
    await axios.post("/api/lookupsData/insertDataIntoLookups/globalValues", {
      nameOfNewValue: "LoanPercentage",
      newValue: Number.parseFloat(loanPercentage.toString()),
    });
  };
  const editLoanPercentage = async () => {
    await axios.post("/api/lookupsData/updateDataIntoLookups/globalValues", {
      newValue: Number.parseFloat(loanPercentage.toString()),
    });
  };

  const addInsurance = async () => {
    await axios.post(
      "/api/lookupsData/insertDataIntoLookups/insurancePercentages",
      {
        insurancePercentageByPerson: Number.parseFloat(
          personInsurancePercentage.toString()
        ),
        insurancePercentageBySherka: Number.parseFloat(
          companyInsurancePercentage.toString()
        ),
      }
    );
  };

  const editTime = async () => {
    let newEndHour = new Date(`2022-12-12T${endHour}:00`);
    let newStartHour = new Date(`2022-12-12T${startHour}:00`);
    await axios.post("/api/lookupsData/updateDataIntoLookups/workingHours", {
      startTime: newStartHour,
      endTime: newEndHour,
      workingHoursId: 1,
    });
  };

  const addTime = async () => {
    let newEndHour = new Date(`2022-12-12T${endHour}:00`);
    let newStartHour = new Date(`2022-12-12T${startHour}:00`);
    await axios.post("/api/lookupsData/insertDataIntoLookups/workingHours", {
      startTime: newStartHour,
      endTime: newEndHour,
    });
  };

  return (
    <div>
      <div className="m-12 font-display basis-5/6 mr-80">
        <div>
          <SystemConstantsRow
            title="نسبة معامل الاضافة اليومية"
            value={hafezExtraDayRatio}
            onChange={onHafezDayChange}
          />
          <SystemConstantsRow
            title="نسبة معامل الساعة الاضافية"
            value={hafezExtraHourRatio}
            onChange={onHafezHourChange}
          />
          <SystemConstantsRow
            title="نسبة الخصم اليومية"
            value={khasmLateDayRatio}
            onChange={onKhasmLateDayChange}
          />
          <SystemConstantsRow
            title="نسبة ساعة الخصم"
            value={khasmLateHourRatio}
            onChange={onKhasmLateHourChange}
          />
          <div className="flex self-center justify-center">
            <button
              className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
              onClick={
                isHafezAndKhasmNew ? addHafezAndKahsm : editHafezAndKahsm
              }
            >
              {isHafezAndKhasmNew ? "ادخال" : "تعديل"}
            </button>
          </div>
        </div>
        <div>
          <SystemConstantsRow
            title="نسبة التأمين الشخصي"
            value={personInsurancePercentage}
            onChange={onPersonInsuranceChange}
          />
          <SystemConstantsRow
            title="نسبة تأمين الشركة"
            value={companyInsurancePercentage}
            onChange={onCompanyInsuranceChange}
          />
          <div className="flex self-center justify-center">
            <button
              className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
              onClick={isInsuranceNew ? addInsurance : editInsurance}
            >
              {isInsuranceNew ? "ادخال" : "تعديل"}
            </button>
          </div>
        </div>
        <div>
          <SystemConstantsRow
            title="نسبة السلفة"
            value={loanPercentage}
            onChange={onPersonLoanPercentageChange}
          />
          <div className="flex self-center justify-center">
            <button
              className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
              onClick={
                isLoanPercentageNew ? addLoanPercentage : editLoanPercentage
              }
            >
              {isLoanPercentageNew ? "ادخال" : "تعديل"}
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-baseline m-4 justify-evenly">
            <input
              className="px-4 py-3 text-center border border-gray-300 rounded-lg w-fit focus:outline-blue-500"
              type="time"
              placeholder="ادخل القيمة"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            />
            <h1>مواعيد بدا العمل</h1>
          </div>
          <div className="flex flex-row items-baseline m-4 justify-evenly">
            <input
              className="px-4 py-3 text-center border border-gray-300 rounded-lg w-fit focus:outline-blue-500"
              type="time"
              placeholder="ادخل القيمة"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
            />
            <h1>مواعيد انتهاء العمل</h1>
          </div>

          <div className="flex self-center justify-center">
            <button
              className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
              onClick={isTimeNew ? addTime : editTime}
            >
              {isTimeNew ? "ادخال" : "تعديل"}
            </button>
          </div>
        </div>
      </div>
      <SideBar pageName="const" />
    </div>
  );
};

// useEffect(() => {
//   const fetchData = async () => {
//     const response = await axios.get(
//       "/api/lookupsData/getDataFromLookups/getConstants"
//     );
//     const loanPercentageResponse = await axios.get(
//       "/api/lookupsData/getDataFromLookups/globalValues"
//     );

//     if (loanPercentageResponse !== null) {
//       setIsLoanPercentageNew(false);
//     }

//     if (
//       response.data.HafezExtraDayRatio !== null &&
//       response.data.HafezExtraHourRatio !== null &&
//       response.data.KhasmLateDayRatio !== null &&
//       response.data.KhasmLateHourRatio !== null
//     ) {
//       setIsHafezAndKhasmNew(false);
//     } else {
//       setIsHafezAndKhasmNew(true);
//     }
//     if (
//       response.data.PersonInsurancePercentage !== 0 &&
//       response.data.SherkaInsurancePercentage !== 0
//     ) {
//       setIsInsuranceNew(false);
//     } else {
//       setIsInsuranceNew(true);
//     }

//     const { startHour, endHour } = response.data;
//     if (startHour !== "" && endHour !== "") {
//       let newStartHour = response.data.startHour.split("T")[1].slice(0, 5);
//       let newEndHour = response.data.endHour.split("T")[1].slice(0, 5);
//       setStartHour(newStartHour);
//       setEndHour(newEndHour);
//       setIsTimeNew(false);
//     } else {
//       setIsTimeNew(true);
//     }
//     // setIsTimeNew(true);
//     setLoanPercentage(loanPercentageResponse.data.Value);
//     setHafezExtraDayRatio(response.data.HafezExtraDayRatio);
//     setHafezExtraHourRatio(response.data.HafezExtraHourRatio);
//     setKhasmLateDayRatio(response.data.KhasmLateDayRatio);
//     setKhasmLateHourRatio(response.data.KhasmLateHourRatio);
//     setPersonInsurancePercentage(response.data.PersonInsurancePercentage);
//     setCompanyInsurancePercentage(response.data.SherkaInsurancePercentage);
//   };
//   fetchData();
// }, []);

export async function getServerSideProps(context: any) {
  const getAllConstants = await fetch(
    `https://jmm-systems.vercel.app/api/lookupsData/getDataFromLookups/getConstants`
  );
  const getAllLoanPercentage = await fetch(
    `https://jmm-systems.vercel.app/api/lookupsData/getDataFromLookups/globalValues`
  );

  const Constants = await getAllConstants.json();
  const LoanPercentage = await getAllLoanPercentage.json();

  const hafezAndkhasmRatios = {
    hafezExtraDayRatio: Constants.data.HafezExtraDayRatio,
    hafezExtraHourRatio: Constants.data.HafezExtraHourRatio,
    khasmLateDayRatio: Constants.data.KhasmLateDayRatio,
    khasmLateHourRatio: Constants.data.KhasmLateHourRatio,
  };

  const InsurancePercentage = {
    personInsurancePercentage: Constants.data.PersonInsurancePercentage,
    companyInsurancePercentage: Constants.data.SherkaInsurancePercentage,
  };

  const Time = {
    startHour: Constants.data.startHour.split("T")[1].slice(0, 5),
    endHour: Constants.data.endHour.split("T")[1].slice(0, 5),
  };

  const loanPercentage = {
    loanPercentage: LoanPercentage.data,
  };

  return {
    props: {
      hafezAndkhasmRatios,
      InsurancePercentage,
      Time,
      loanPercentage,
    },
  };
}

export default System;
