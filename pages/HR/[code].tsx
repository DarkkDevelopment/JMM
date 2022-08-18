import 'react-toastify/dist/ReactToastify.css';
import React, { ReactPropTypes, useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextField from "../../components/TextField";

import RadioButtonComp from "../../components/RadioButtonComp";
import EmployeeVacation from "../../components/EmployeeVacation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import CustomizableTextField from "../../components/CustomizableTextField";
import axios from "axios";
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
import { Alert } from '../../services/alerts/Alert';
// @ts-ignore
function EmployeeDetails(props) {
  const router = useRouter();
  const code = router.query.code as string;
  const [employee, setEmployee] = useState<IEmployeeProfileModel | undefined>(
    undefined
  );
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
    await axios.delete(`/api/HR_Endpoints/employee/delete?PersonCode=${code}`);
    router.back();
  };
  useEffect(() => {
    const fetchData = async () => {
      const govRes = await getMohafzatService();

      const workRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/wazayef"
      );
      const dyanaRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/personDeyana"
      );
      const typeRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/personTypes"
      );

      let workData = workRes.data.map((item: any) => {
        return { id: item.WazeefaID, name: item.WazeefaName };
      });
      let dyanaData = dyanaRes.data.map((item: any) => {
        return { value: item.DyanaID, label: item.DyanaName };
      });
      let typeData = typeRes.data.map((item: any) => {
        return { value: item.PersonTypeID, label: item.PersonType };
      });

      setGovs(govRes.data);
      setWazayef(workData);
      setReligion(dyanaData);
      setTypes(typeData);

      let response = await axios.get(
        `/api/HR_Endpoints/employee/getEmployee?PersonCode=${code}`
      );
      setEmployee(response.data);
      const {
        employeeGeneralInfo,
        employeeAddress,
        employeeMobile,
        employeeMoratab,
        employeeWazeefa,
      }: IEmployeeProfileModel = response.data;
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
        PersonMohafzaID === null ? 0 : PersonMohafzaID,
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
  }, [code]);
  const saveEmployee = async (e: any) => {
    e.preventDefault();
    
    let response = await axios.post("/api/HR_Endpoints/employee/update", {
      PersonCode: Number.parseInt(code!.toString()),
      PersonFirstName: firstN,
      PersonSecondName: secondN,
      PersonThirdName: thirdN,
      PersonFourthName: fourthN,
      PersonRaqamQawmy: nationlNo,
      PersonRaqamTa2meeny: insuranceNo,
      PersonTelephoneArdy: landlineNo,
      PersonTaree5Milad: birthDate,
      PersonTaree5Ta3yeen: assignDate,
      PersonSanawatTa2meen: insuranceYears,
      PersonManteqaID: district,
      PersonMohafzaID: govVal,
      PersonDyana: dyana,
      PersonType: type,
      PersonTa2meenValue: Number(insuranceVal),
      PersonAddress: address,

      CurrentMorattab: Number(salary),
      MobileNumber: mobileNo,
      PersonWazeefa: work,
      PersonMorattabDareebaPercentage: draybPercent,
    });
    if (response.status === 200) {
      Alert.Success("تم تعديل البيانات بنجاح");
      setEditData(false);
    } else {
      Alert.Error("حدث خطأ اثناء التعديل");
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
            {editdata ? "عرض البيانات" : "تعديل البيانات"}
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={deleteEmployee}
          >
            حذف الموظف
          </button>
        </div>
        <h1 className="p-5 text-3xl text-center text-black font-display">
          بيانات شخصية
        </h1>

        <div className="grid justify-center grid-cols-2 px-4 mx-16 rounded-lg">
          <div className="flex flex-col p-4 mt-3 space-y-10 text-right bg-white rounded-l-2xl">
            <TextField
              label="الكود"
              isEditable={true}
              value={code?.toString()}
            />
            <div className="flex flex-col p-4 mt-3 space-y-10 text-right bg-white rounded-lg ">
              <div className="flex flex-row items-center justify-between">
                <input
                  type="date"
                  className="px-4 py-2 m-3 leading-tight text-center text-black border rounded w-80 "
                  onChange={(e) => setBirthDate(new Date(e.target.value))}
                  value={birthDate.toISOString().split("T")[0]}
                  disabled={!editdata}
                />

                <h6 className="text-sm text-right text-gray-700">
                  تاريخ الميلاد
                </h6>
              </div>
              <div className="flex flex-row items-center justify-between">
                <input
                  type="date"
                  className="px-4 py-2 m-3 leading-tight text-center text-black border rounded w-80 "
                  onChange={(e) => setAssignDate(new Date(e.target.value))}
                  value={assignDate.toISOString().split("T")[0]}
                  disabled={!editdata}
                />

                <h6 className="text-sm text-right text-gray-700">
                  تاريخ التعيين
                </h6>
              </div>
            </div>
            <div className="flex flex-col justify-around bg-white rounded-lg ">
              <div className="flex flex-row justify-end">
                <div className="mr-5">
                  <Dropdown
                    title="المحافظة"
                    options={govs}
                    value={govVal}
                    onChange={handleGovChange}
                    isDisabled={!editdata}
                  />
                </div>
                <div>
                  <Dropdown
                    title="المنطقة"
                    options={manateq}
                    value={district}
                    isDisabled={!editdata}
                    onChange={onDistrictChange}
                  />
                </div>


              </div>
              <TextField
                label="العنوان"
                isEditable={!editdata}
                value={address}
                onChange={setAddress}
              />
            </div>
            <div className="flex flex-row justify-end bg-white rounded-lg ">
              <Dropdown
                title="الوظيفة"
                options={wazayef}
                value={work}
                isDisabled={!editdata}
              />
              <label className="p-2 text-sm text-right text-gray-700 ">
                الوظيفة
              </label>
            </div>
            <RadioButtonComp
              label="الديانة"
              editable={!editdata}
              options={religion}
              onChange={setDyana}
              value={dyana}
            />
            <RadioButtonComp
              label="النوع"
              editable={!editdata}
              options={types}
              onChange={setType}
              value={type}
            />
            <TextField
              label="عدد سنوات التأمين"
              isEditable={!editdata}
              value={insuranceYears.toString()}
              onChange={setInsuranceYear}
            />
            <TextField
              label="المرتب"
              isEditable={!editdata}
              value={salary.toString()}
              onChange={setSalary}
            />
          </div>
          <div className="flex flex-col p-4 mt-3 space-y-10 text-right bg-white rounded-lg ">
            <CustomizableTextField
              label="الاسم"
              placeholders={[
                "الاسم الرابع",
                "الاسم الثالث",
                "الاسم الثاني",
                "الاسم الاول",
              ]}
              isEditable={!editdata}
              values={[fourthN, thirdN, secondN, firstN]}
              onChange={[setFourthN, setThirdN, setSecondN, setFirstN]}
            />
            <TextField
              label="رقم المحمول"
              isEditable={!editdata}
              value={mobileNo}
              onChange={setMobileN}
            />
            <TextField
              label="الرقم القومي"
              isEditable={!editdata}
              value={nationlNo}
              onChange={setNationalNo}
            />
            <TextField
              label="رقم التليفون الأرضي"
              isEditable={!editdata}
              value={landlineNo}
              onChange={setLandlineNo}
            />
            <TextField
              label="الرقم التأميني"
              isEditable={!editdata}
              value={insuranceNo}
              onChange={setInsuranceNo}
            />
            <TextField
              label="قيمة التأمين"
              value={insuranceVal.toString()}
              isEditable={!editdata}
              condition={(val: number) =>
                1400 <= val && val <= 9600 ? true : false
              }
              errorMsg="برجاء ادخال رقم بين 1400 ل 9600"
              onChange={setInsuranceVal}
            />
            <TextField
              label="نسبة الضرائب"
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
              حفظ التغييرات
            </button>
          </div>
        ) : null}
        <EmployeesVacations personCode={Number.parseInt(code)} />
        <div className="flex flex-row justify-center p-4 mt-3 bg-gray-100 space-x-96 ">
          <PersonSolfaComp PersonCode={Number.parseInt(code)} />
          <PersonMorattabComp personId={Number.parseInt(code)} />
        </div>

      </div>
    </>
  );
}

export default EmployeeDetails;
