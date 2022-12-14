import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextField from "../../components/TextField";
import RadioButtonComp from "../../components/RadioButtonComp";
import CustomizableTextField from "../../components/CustomizableTextField";
import axios from "../../utils/axios";
import { IEmployeeProfileModel } from "../../interfaces/employees";
import { EmployeesVacations } from "../../components/EmployeesVacations";
import { PersonMorattabComp } from "../../components/PersonMorattabComp";
import { PersonSolfaComp } from "../../components/PersonSolfaComp";
import Dropdown from "../../components/DropDown";
import {
  getManateqByMohafzaIdService,
  getMohafzatService,
} from "../../services/constantsService";
import { ToastContainer } from "react-toastify";
import { Alert } from "../../services/alerts/Alert";
import { InferGetServerSidePropsType } from "next";

function EmployeeDetails(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const employeeDetails = props.employeeData;
  const DeyanaTypes = props.dyanaRes;
  const typesData = props.typeRes;
  const wazayefTypes = props.workRes;
  const governments = props.govRes;

  const Usercode = router.query.code as string;
  console.log(Usercode);

  const [editdata, setEditData] = useState(false);
  // input states
  const [address, setAddress] = useState("");
  const [firstN, setFirstN] = useState("");
  const [secondN, setSecondN] = useState("");
  const [thirdN, setThirdN] = useState("");
  const [fourthN, setFourthN] = useState("");
  const [mobileNo, setMobileN] = useState("");
  const [nationlNo, setNationalNo] = useState("");
  const [landlineNo, setLandlineNo] = useState("");
  const [insuranceNo, setInsuranceNo] = useState("");
  const [insuranceVal, setInsuranceVal] = useState<"" | number>("");
  const [insuranceYears, setInsuranceYear] = useState<"" | number>("");
  const [salary, setSalary] = useState<"" | number>("");
  const [draybPercent, setDraybPercent] = useState<"" | number>("");
  const [govs, setGovs] = useState<{ name: string; id: number }[]>([]);
  const [manateq, setManateq] = useState<{ name: string; id: number }[]>([]);
  const [wazayef, setWazayef] = useState<{ name: string; id: number }[]>([]);
  const [religion, setReligion] = useState([]);
  const [types, setTypes] = useState([]);
  const [govVal, onGovChange] = useState<any | undefined>(undefined);
  const [district, onDistrictChange] = useState<any | undefined>(undefined);
  const [work, onWorkChange] = useState<any | undefined>(undefined);
  const [dyana, setDyana] = useState<number | undefined>(undefined);
  const [type, setType] = useState<number | undefined>(undefined);
  const [birthDate, setBirthDate] = useState(new Date());
  const [assignDate, setAssignDate] = useState(new Date());

  const deleteEmployee = async (e: any) => {
    e.preventDefault();
    await axios.delete(
      `/api/HR_Endpoints/employee/delete?PersonCode=${Usercode}`
    );
    router.back();
  };

  useEffect(() => {
    const fetchData = async () => {
      let workData = wazayefTypes.map((item: any) => {
        return { id: item.WazeefaID, name: item.WazeefaName };
      });
      let dyanaData = DeyanaTypes.map((item: any) => {
        return { value: item.DyanaID, label: item.DyanaName };
      });
      let typeData = typesData.map((item: any) => {
        return { value: item.PersonTypeID, label: item.PersonType };
      });

      setGovs(governments.data);
      setWazayef(workData);
      setReligion(dyanaData);
      setTypes(typeData);

      const {
        employeeGeneralInfo,
        employeeAddress,
        employeeMobile,
        employeeMoratab,
        employeeWazeefa,
      }: IEmployeeProfileModel = employeeDetails;
      const {
        PersonTaree5Milad,
        PersonTaree5Ta3yeen,
        PersonDyanaId,
        PersonTypeId,
        PersonFirstName,
        PersonSecondName,
        PersonThirdName,
        PersonFourthName,
        PersonRaqamQawmy,
        PersonRaqamTa2meeny,
        PersonSanawatTa2meen,
        PersonTa2meenValue,
        PersonTelephoneArdy,
      } = employeeGeneralInfo;
      const { PersonManteqaID, PersonMohafzaID, PersonAddress } =
        employeeAddress;
      const { PersonWazeefaId } = employeeWazeefa;

      const { MobileNumber } = employeeMobile;
      const { CurrentMorattab, PersonMorattabDareebaPercentage } =
        employeeMoratab;
      setBirthDate(new Date(PersonTaree5Milad));
      setAssignDate(new Date(PersonTaree5Ta3yeen));
      const manteqRes = await getManateqByMohafzaIdService(
        PersonMohafzaID === null ? 0 : PersonMohafzaID
      );
      setManateq(manteqRes.data);
      setFirstN(PersonFirstName);
      setSecondN(PersonSecondName);
      setThirdN(PersonThirdName);
      setFourthN(PersonFourthName);
      setNationalNo(PersonRaqamQawmy);
      setInsuranceNo(PersonRaqamTa2meeny);
      setInsuranceYear(PersonSanawatTa2meen);
      setInsuranceVal(PersonTa2meenValue);
      setLandlineNo(PersonTelephoneArdy!);
      setAddress(PersonAddress);
      onGovChange(PersonMohafzaID);
      onDistrictChange(PersonManteqaID);
      setMobileN(MobileNumber);
      setSalary(CurrentMorattab);
      onWorkChange(PersonWazeefaId);
      setDyana(PersonDyanaId);
      setType(PersonTypeId);
      setDraybPercent(PersonMorattabDareebaPercentage);
    };
    fetchData();
  }, [
    DeyanaTypes,
    Usercode,
    employeeDetails,
    governments.data,
    typesData,
    wazayefTypes,
  ]);

  const saveEmployee = async (e: any) => {
    e.preventDefault();
    const updatedUser = {
      PersonFirstName: firstN,
      PersonSecondName: secondN,
      PersonThirdName: thirdN,
      PersonFourthName: fourthN,
      PersonRaqamQawmy: nationlNo,
      PersonRaqamTa2meeny: insuranceNo,
      PersonSanawatTa2meen: Number(insuranceYears),
      PersonTa2meenValue: Number(insuranceVal),
      PersonTelephoneArdy: landlineNo,
      PersonAddress: address,
      PersonMohafzaID: govVal,
      PersonManteqaID: district,
      PersonWazeefa: work,
      PersonDyana: Number(dyana),
      PersonType: Number(type),
      PersonTaree5Milad: birthDate,
      PersonTaree5Ta3yeen: assignDate,
      PersonMorattabDareebaPercentage: Number(draybPercent),
      CurrentMorattab: Number(salary),
      MobileNumber: mobileNo,
      PersonCode: Number(Usercode),
      deletedAt: null,
    };
    console.log(updatedUser);
    try {
      let response = await axios({
        method: "PUT",
        url: "/api/HR_Endpoints/employee/update",
        data: updatedUser,
      });
      if (response.status === 200) {
        Alert.Success("???? ?????????? ???????????????? ??????????");
        setEditData(false);
        router.push("/HR/Employees");
      } else {
        Alert.Error("?????? ?????? ?????????? ??????????????");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGovChange = async (val: number) => {
    const res = await getManateqByMohafzaIdService(val);
    onGovChange(val);
    setManateq(res.data);
    if (res.data.length > 0) onDistrictChange(res.data[0].id);
  };

  return (
    <>
      <div className="bg-gray-100">
        <ToastContainer />
        <div className="flex flex-row justify-between p-10">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              setEditData(!editdata);
            }}
          >
            {editdata ? "?????? ????????????????" : "?????????? ????????????????"}
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={deleteEmployee}
          >
            ?????? ????????????
          </button>
        </div>
        <h1 className="p-5 text-3xl text-center text-black font-display">
          ???????????? ??????????
        </h1>

        <div className="grid justify-center grid-cols-2 px-4 mx-16 rounded-lg">
          <div className="flex flex-col p-4 mt-3 space-y-10 text-right bg-white rounded-l-2xl">
            <TextField
              label="??????????"
              isEditable={true}
              value={Usercode?.toString()}
            />
            <div className="flex flex-col pl-40 p-4 mt-3 space-y-10 text-right bg-white rounded-lg ">
              <div className="flex flex-row items-center justify-between">
                <input
                  type="date"
                  className="w-1/2 px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                  onChange={(e) => setBirthDate(new Date(e.target.value))}
                  value={birthDate.toISOString().split("T")[0]}
                  disabled={!editdata}
                />
                <h6 className="text-lg text-right self-center text-gray-700">
                  ?????????? ??????????????
                </h6>
              </div>

              <div className="flex flex-row items-center justify-between">
                <input
                  type="date"
                  className="w-1/2 px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                  onChange={(e) => setAssignDate(new Date(e.target.value))}
                  value={assignDate.toISOString().split("T")[0]}
                  disabled={!editdata}
                />

                <h6 className="text-lg text-right self-center text-gray-700">
                  ?????????? ??????????????
                </h6>
              </div>
            </div>

            <div className="flex flex-col justify-around bg-white rounded-lg ">
              <div className="flex pl-40 p-4 mt-3 flex-row justify-between">
                <div className="mr-5">
                  <Dropdown
                    title="????????????????"
                    options={govs}
                    value={govVal}
                    onChange={handleGovChange}
                    isDisabled={!editdata}
                  />
                </div>
                <div>
                  <Dropdown
                    title="??????????????"
                    options={manateq}
                    value={district}
                    isDisabled={!editdata}
                    onChange={onDistrictChange}
                  />
                </div>
              </div>
              <TextField
                label="??????????????"
                isEditable={!editdata}
                value={address}
                onChange={setAddress}
              />
            </div>
            <div className="flex flex-row pl-40 p-4 mt-3 justify-between bg-white rounded-lg">
              <Dropdown
                title="??????????????"
                options={wazayef}
                value={work}
                isDisabled={!editdata}
                onChange={onWorkChange}
              />
              <label className="text-lg text-right self-center text-gray-700">
                ??????????????
              </label>
            </div>
            <div className="flex flex-row p-4 mt-3 justify-end bg-white rounded-lg">
              <RadioButtonComp
                label="??????????????"
                editable={!editdata}
                options={religion}
                onChange={setDyana}
                value={dyana}
              />
            </div>

            <div className="flex flex-row p-4 mt-3 justify-end bg-white rounded-lg">
              <RadioButtonComp
                label="??????????"
                editable={!editdata}
                options={types}
                onChange={setType}
                value={type}
              />
            </div>

            <TextField
              label="?????? ?????????? ??????????????"
              isEditable={!editdata}
              value={insuranceYears.toString()}
              onChange={setInsuranceYear}
            />
            <TextField
              label="????????????"
              isEditable={!editdata}
              value={salary.toString()}
              onChange={setSalary}
            />
          </div>
          <div className="flex flex-col p-4 mt-3 space-y-10 text-right bg-white rounded-lg ">
            <CustomizableTextField
              label="??????????"
              placeholders={[
                "?????????? ????????????",
                "?????????? ????????????",
                "?????????? ????????????",
                "?????????? ??????????",
              ]}
              isEditable={!editdata}
              values={[fourthN, thirdN, secondN, firstN]}
              onChange={[setFourthN, setThirdN, setSecondN, setFirstN]}
            />
            <TextField
              label="?????? ??????????????"
              isEditable={!editdata}
              value={mobileNo}
              onChange={setMobileN}
            />
            <TextField
              label="?????????? ????????????"
              isEditable={!editdata}
              value={nationlNo}
              onChange={setNationalNo}
            />
            <TextField
              label="?????? ???????????????? ????????????"
              isEditable={!editdata}
              value={landlineNo}
              onChange={setLandlineNo}
            />
            <TextField
              label="?????????? ????????????????"
              isEditable={!editdata}
              value={insuranceNo}
              onChange={setInsuranceNo}
            />
            <TextField
              label="???????? ??????????????"
              value={insuranceVal.toString()}
              isEditable={!editdata}
              condition={(val: number) =>
                1400 <= val && val <= 9600 ? true : false
              }
              errorMsg="?????????? ?????????? ?????? ?????? 1400 ?? 9600"
              onChange={setInsuranceVal}
            />
            <TextField
              label="???????? ??????????????"
              value={draybPercent.toString()}
              isEditable={!editdata}
              onChange={setDraybPercent}
            />
          </div>
        </div>
        {editdata ? (
          <div className="mx-8 place-content-center">
            <button
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
              onClick={saveEmployee}
            >
              ?????? ??????????????????
            </button>
          </div>
        ) : null}

        <EmployeesVacations personCode={Number.parseInt(Usercode)} />

        <div className="flex flex-row justify-center p-4 mt-3 bg-gray-100 space-x-96 ">
          <PersonSolfaComp PersonCode={Number.parseInt(Usercode)} />
          <PersonMorattabComp personId={Number.parseInt(Usercode)} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { code } = context.query;
  const employeeData = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/employee/getEmployee?PersonCode=${code}`
  );
  const govRes = await getMohafzatService();

  const workRes = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookupsData/getDataFromLookups/wazayef`
  );
  const dyanaRes = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookupsData/getDataFromLookups/personDeyana`
  );
  const typeRes = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookupsData/getDataFromLookups/personTypes`
  );
  const employeeDataJSON = await employeeData.json();
  const workJSON = await workRes.json();
  const dyanaJSON = await dyanaRes.json();
  const typeJSON = await typeRes.json();

  return {
    props: {
      employeeData: employeeDataJSON,
      govRes: govRes,
      workRes: workJSON,
      dyanaRes: dyanaJSON,
      typeRes: typeJSON,
    },
  };
}

export default EmployeeDetails;
