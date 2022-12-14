import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { AppProps } from "next/dist/shared/lib/router/router";
import React, { useEffect, useState } from "react";
import SideBar from "../../../components/sideBar";
import { SystemConstantsRow } from "../../../components/SystemConstantsRow";
import { InferGetServerSidePropsType } from "next";
import { NEXT_PUBLIC_HOST } from "../../../config/config";
import { Alert } from '../../../services/alerts/Alert';
import { ToastContainer } from 'react-toastify';

// @ts-ignore
const System = (props) => {
  // const ourStartHour = props.Time.startHour;
  // const ourEndHour = props.Time.endHour;
  // const ourHafezExtraHourRatio = props.hafezAndkhasmRatios.hafezExtraHourRatio;
  // const ourKhasmLateHourRatio = props.hafezAndkhasmRatios.khasmLateHourRatio;
  // const ourHafezExtraDayRatio = props.hafezAndkhasmRatios.hafezExtraDayRatio;
  // const ourKhasmLateDayRatio = props.hafezAndkhasmRatios.khasmLateDayRatio;
  // const ourPersonInsurancePercentage =
  //   props.InsurancePercentage.personInsurancePercentage;
  // const ourCompanyInsurancePercentage =
  //   props.InsurancePercentage.companyInsurancePercentage;
  // const ourLoanPercentage = props.loanPercentage.loanPercentage;

  const reloadPage = () => window.location.reload();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "/api/lookupsData/getDataFromLookups/getConstants"
      );
      const loanPercentageResponse = await axios.get(
        "/api/lookupsData/getDataFromLookups/globalValues"
      );
      const elawaPercentageResponse = await axios.get('/api/lookupsData/getDataFromLookups/elawatPercentage');
      const badalatPercentageResponse = await axios.get('/api/lookupsData/getDataFromLookups/badalatPercentage');
      console.log(elawaPercentageResponse.data, badalatPercentageResponse.data);
      if (loanPercentageResponse.data !== 0 || elawaPercentageResponse.data !== null || badalatPercentageResponse.data !== null) {
        setIsLoanPercentageNew(false);
      } else {
        setIsLoanPercentageNew(true);
      }

      if (
        response.data.HafezExtraDayRatio !== 0 &&
        response.data.HafezExtraHourRatio !== 0 &&
        response.data.KhasmLateDayRatio !== 0 &&
        response.data.KhasmLateHourRatio !== 0
      ) {
        setIsHafezAndKhasmNew(false);
      } else {
        setIsHafezAndKhasmNew(true);
      }
      if (
        response.data.PersonInsurancePercentage !== 0 &&
        response.data.SherkaInsurancePercentage !== 0
      ) {
        setIsInsuranceNew(false);
      } else {
        setIsInsuranceNew(true);
      }

      const { startHour, endHour } = response.data;
      if (startHour !== "" && endHour !== "") {
        let newStartHour = response.data.startHour.split("T")[1].slice(0, 5);
        let newEndHour = response.data.endHour.split("T")[1].slice(0, 5);
        setStartHour(newStartHour);
        setEndHour(newEndHour);
        setIsTimeNew(false);
      } else {
        setIsTimeNew(true);
      }
      // setIsTimeNew(true);
      setLoanPercentage(loanPercentageResponse.data);
      setHafezExtraDayRatio(response.data.HafezExtraDayRatio);
      setHafezExtraHourRatio(response.data.HafezExtraHourRatio);
      setKhasmLateDayRatio(response.data.KhasmLateDayRatio);
      setKhasmLateHourRatio(response.data.KhasmLateHourRatio);
      setPersonInsurancePercentage(response.data.PersonInsurancePercentage);
      setCompanyInsurancePercentage(response.data.SherkaInsurancePercentage);
      setBadalatPercentage(badalatPercentageResponse.data == null? 0 : badalatPercentageResponse.data);
      setElawaPercentage(elawaPercentageResponse.data == null? 0 : elawaPercentageResponse.data);
    };
    fetchData();
  }, []);

  const [hafezExtraDayRatio, setHafezExtraDayRatio] = useState<string | number>(
    0
  );
  const [hafezExtraHourRatio, setHafezExtraHourRatio] = useState<
    string | number
  >(0);
  const [khasmLateDayRatio, setKhasmLateDayRatio] = useState<string | number>(
    0
  );
  const [khasmLateHourRatio, setKhasmLateHourRatio] = useState<string | number>(
    0
  );
  const [personInsurancePercentage, setPersonInsurancePercentage] = useState<
    string | number
  >(0);
  const [companyInsurancePercentage, setCompanyInsurancePercentage] = useState<
    string | number
  >(0);

  const [startHour, setStartHour] = useState<string>("09:00");
  const [endHour, setEndHour] = useState<string>("17:00");

  const [loanPercentage, setLoanPercentage] = useState<string | number>(0);
  const [isHafezAndKhasmNew, setIsHafezAndKhasmNew] = useState(true);
  const [isInsuranceNew, setIsInsuranceNew] = useState(true);
  const [isTimeNew, setIsTimeNew] = useState(true);
  const [isLoanPercentageNew, setIsLoanPercentageNew] = useState(true);
  const [elawaPercentage, setElawaPercentage] = useState<string | number>(0);
  const [badalatPercentage, setBadalatPercentage] = useState<string | number>(
    0
  );

  const onElawaPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElawaPercentage(e.target.value);
  };

  const onBadalatPercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBadalatPercentage(e.target.value);
  };

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
    ).then(() => {
      Alert.Success("???? ?????????? ???????????????? ??????????");
    }).catch(err => {
      Alert.Error("?????? ?????? ?????????? ?????????? ????????????????");
    });
    //  reloadPage();
  };

  const addHafezAndKahsm = async () => {
    if (Number.parseFloat(hafezExtraDayRatio.toString()) === 0 || Number.parseFloat(hafezExtraHourRatio.toString()) === 0 || Number.parseFloat(khasmLateDayRatio.toString()) === 0 || Number.parseFloat(khasmLateHourRatio.toString()) === 0) {
      alert('?????????? ?????????? ???????? ????????????????');
      return;
    }
    await axios.post(
      "/api/lookupsData/insertDataIntoLookups/hafezKhasmRatios",
      {
        hafezDayRatio: Number.parseFloat(hafezExtraDayRatio.toString()),
        hafezHourRatio: Number.parseFloat(hafezExtraHourRatio.toString()),
        khasmDayRatio: Number.parseFloat(khasmLateDayRatio.toString()),
        khasmHourRatio: Number.parseFloat(khasmLateHourRatio.toString()),
      }
    ).then(() => {
      setIsHafezAndKhasmNew(false);
      Alert.Success('???? ?????????? ???????????????? ??????????');
    }).catch(err => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    });
    // reloadPage();
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
    ).then(() => {
      Alert.Success('???? ?????????? ???????????????? ??????????');
    }).catch(err => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    });
    //reloadPage();
  };
  const addLoanPercentage = async () => {

    await axios.post("/api/lookupsData/insertDataIntoLookups/globalValues", {
      nameOfNewValue: "LoanPercentage",
      newValue: Number.parseFloat(loanPercentage.toString()),
    }).catch((err) => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    });

    await axios.post("/api/lookupsData/insertDataIntoLookups/badalatPercentage", {
      value: Number.parseFloat(badalatPercentage.toString()),
    }).catch(err => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    })

    await axios.post("/api/lookupsData/insertDataIntoLookups/elawatPercentage", {
      value: Number.parseFloat(elawaPercentage.toString()),
    }).catch(err => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    })
    //setIsLoanPercentageNew(false);
    Alert.Success('???? ?????????? ???????????????? ??????????');

    //reloadPage();
  };
  const editLoanPercentage = async () => {

    await axios.post("/api/lookupsData/updateDataIntoLookups/globalValues", {
      newValue: Number.parseFloat(loanPercentage.toString()),
    }).catch((err) => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    });

    await axios.post("/api/lookupsData/updateDataIntoLookups/badalatPercentage", {
      value: Number.parseFloat(badalatPercentage.toString()),
    }).catch((err) => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    });

    await axios.post("/api/lookupsData/updateDataIntoLookups/elawatPercentage", {
      value: Number.parseFloat(elawaPercentage.toString()),
    }).catch((err) => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    })

    Alert.Success('???? ?????????? ???????????????? ??????????');
    // reloadPage();
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
    ).then(() => {
      setIsInsuranceNew(false);
      Alert.Success('???? ?????????? ???????????????? ??????????');
    }).catch(err => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    });
    //   reloadPage();
  };

  const editTime = async () => {
    let startHourArr = startHour.split(":");
    let endHourArr = endHour.split(":");
    let utcStartHour = new Date().setUTCHours(
      Number(startHourArr[0]),
      Number(startHourArr[1])
    );
    let utcEndHour = new Date().setUTCHours(
      Number(endHourArr[0]),
      Number(endHourArr[1])
    );
    let newStartHour = new Date(utcStartHour);
    let newEndHour = new Date(utcEndHour);
    await axios.post("/api/lookupsData/updateDataIntoLookups/workingHours", {
      startTime: newStartHour,
      endTime: newEndHour,
      workingHoursId: 1,
    }).then(() => {
      Alert.Success('???? ?????????? ???????????????? ??????????');
    }).catch(err => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    });
    // reloadPage();
  };

  const addTime = async () => {
    let startHourArr = startHour.split(":");
    let endHourArr = endHour.split(":");
    let utcStartHour = new Date().setUTCHours(
      Number(startHourArr[0]),
      Number(startHourArr[1])
    );
    let utcEndHour = new Date().setUTCHours(
      Number(endHourArr[0]),
      Number(endHourArr[1])
    );
    let newStartHour = new Date(utcStartHour);
    let newEndHour = new Date(utcEndHour);
    await axios.post("/api/lookupsData/insertDataIntoLookups/workingHours", {
      startTime: newStartHour,
      endTime: newEndHour,
    }).then(() => {
      setIsTimeNew(false);
      Alert.Success('???? ?????????? ???????????????? ??????????');
    }).catch(err => {
      Alert.Error('?????? ?????? ?????????? ?????????? ????????????????');
    });
    //reloadPage();
  };

  return (
    <div className="flex flex-row bg-gray-100">
      <ToastContainer />
      <div className="grid grid-cols-2 mt-6 ml-12 grid-rows-2font-display basis-5/6 mr-80">
        <div className="p-5 mx-2 my-2 bg-white shadow-lg rounded-3xl">
          <SystemConstantsRow
            title="???????? ?????????? ?????????????? ??????????????"
            value={hafezExtraDayRatio}
            onChange={onHafezDayChange}
          />

          <SystemConstantsRow
            title="???????? ?????????? ???????????? ????????????????"
            value={hafezExtraHourRatio}
            onChange={onHafezHourChange}
          />
          <SystemConstantsRow
            title="???????? ?????????? ??????????????"
            value={khasmLateDayRatio}
            onChange={onKhasmLateDayChange}
          />
          <SystemConstantsRow
            title="???????? ???????? ??????????"
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
              {isHafezAndKhasmNew ? "??????????" : "??????????"}
            </button>
          </div>
        </div>
        <div className="flex flex-col p-5 mx-2 my-2 bg-white shadow-lg rounded-3xl">
          <SystemConstantsRow
            title="???????? ?????????????? ????????????"
            value={personInsurancePercentage}
            onChange={onPersonInsuranceChange}
          />
          <SystemConstantsRow
            title="???????? ?????????? ????????????"
            value={companyInsurancePercentage}
            onChange={onCompanyInsuranceChange}
          />
          <div className="flex flex-col self-center justify-end flex-1">
            <button
              className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
              onClick={isInsuranceNew ? addInsurance : editInsurance}
            >
              {isInsuranceNew ? "??????????" : "??????????"}
            </button>
          </div>
        </div>
        <div className="flex flex-col flex-1 p-5 mx-2 my-2 bg-white shadow-lg rounded-3xl">
          <SystemConstantsRow
            title="???????? ????????????"
            value={loanPercentage}
            onChange={onPersonLoanPercentageChange}
          />
          {/* to be changed */}
          <SystemConstantsRow
            title="???????? ??????????????"
            value={elawaPercentage}
            onChange={onElawaPercentageChange}
          />
          {/* to be changed */}
          <SystemConstantsRow
            title="???????? ??????????????"
            value={badalatPercentage}
            onChange={onBadalatPercentageChange}
          />
          <div className="flex flex-col self-center justify-end flex-1">
            <button
              className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
              onClick={
                isLoanPercentageNew ? addLoanPercentage : editLoanPercentage
              }
            >
              {isLoanPercentageNew ? "??????????" : "??????????"}
            </button>
          </div>
        </div>
        <div className="flex flex-col p-5 mx-2 my-2 bg-white shadow-lg rounded-3xl">
          <div className="flex flex-row items-baseline justify-between m-4">
            <input
              className="px-4 py-3 text-center border border-gray-300 rounded-lg w-fit focus:outline-blue-500"
              type="time"
              placeholder="???????? ????????????"
              value={startHour}
              onChange={(e) => setStartHour(e.target.value)}
            />
            <h1>???????????? ?????? ??????????</h1>
          </div>
          <div className="flex flex-row items-baseline justify-between m-4">
            <input
              className="px-4 py-3 text-center border border-gray-300 rounded-lg w-fit focus:outline-blue-500"
              type="time"
              placeholder="???????? ????????????"
              value={endHour}
              onChange={(e) => setEndHour(e.target.value)}
            />
            <h1>???????????? ???????????? ??????????</h1>
          </div>

          <div className="flex flex-col self-center justify-end flex-1">
            <button
              className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
              onClick={isTimeNew ? addTime : editTime}
            >
              {isTimeNew ? "??????????" : "??????????"}
            </button>
          </div>
        </div>
      </div>
      <SideBar pageName="const" />
    </div>
  );
};

// export async function getServerSideProps(context: any) {
//   const getAllConstants = await fetch(
//     `https://jmm-systems.vercel.app/api/lookupsData/getDataFromLookups/getConstants`
//   );
//   const getAllLoanPercentage = await fetch(
//     `https://jmm-systems.vercel.app/api/lookupsData/getDataFromLookups/globalValues`
//   );

//   const Constants = await getAllConstants.json();
//   const LoanPercentage = await getAllLoanPercentage.json();

//   const hafezAndkhasmRatios = {
//     hafezExtraDayRatio: Constants.data.HafezExtraDayRatio,
//     hafezExtraHourRatio: Constants.data.HafezExtraHourRatio,
//     khasmLateDayRatio: Constants.data.KhasmLateDayRatio,
//     khasmLateHourRatio: Constants.data.KhasmLateHourRatio,
//   };

//   const InsurancePercentage = {
//     personInsurancePercentage: Constants.data.PersonInsurancePercentage,
//     companyInsurancePercentage: Constants.data.SherkaInsurancePercentage,
//   };

//   const Time = {
//     startHour: Constants.data.startHour.split("T")[1].slice(0, 5),
//     endHour: Constants.data.endHour.split("T")[1].slice(0, 5),
//   };

//   const loanPercentage = {
//     loanPercentage: LoanPercentage.data,
//   };

//   return {
//     props: {
//       hafezAndkhasmRatios,
//       InsurancePercentage,
//       Time,
//       loanPercentage,
//     },
//   };
// }

export default System;
