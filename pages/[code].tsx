import React, { ReactPropTypes, useEffect, useState } from "react";
import { useRouter } from "next/router";
import TextField from "../components/TextField";
import Dropdown from "../components/DropDownComp";
import RadioButtonComp from "../components/RadioButtonComp";
import EmployeeVacation from "../components/EmployeeVacation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import CustomizableTextField from "../components/CustomizableTextField";
import axios from "axios";
import { IEmployeeProfileModel } from "../interfaces/employees";
import { EmployeesVacations } from "../components/EmployeesVacations";
import { PersonMorattabComp } from "../components/PersonMorattabComp";
import { PersonSolfaComp } from "../components/PersonSolfaComp";

function EmployeeDetails() {
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

  const [govVal, onGovChange] = useState<string | undefined>(undefined);
  const [district, onDistrictChange] = useState<string | undefined>(undefined);
  const [work, onWorkChange] = useState<string | undefined>(undefined);

  const [dyana, setDyana] = useState<number | undefined>(undefined);
  const [type, setType] = useState<number | undefined>(undefined);

  const [birthDate, setBirthDate] = useState(new Date());
  const [assignDate, setAssignDate] = useState(new Date());

  const deleteEmployee = async (e: any) => {
    e.preventDefault();
    await axios.delete(`/api/employee/delete?PersonCode=${code}`);
    router.back();
  };
  useEffect(() => {
    const fetchData = async () => {
      const govRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/mohafazat"
      );
      const manteqRes = await axios.get(
        "api/lookupsData/getDataFromLookups/manateq"
      );
      const workRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/wazayef"
      );
      const dyanaRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/personDeyana"
      );
      const typeRes = await axios.get(
        "/api/lookupsData/getDataFromLookups/personTypes"
      );
      let govData = govRes.data.map((item: any) => {
        return { id: item.MohafzaID, name: item.MohafzaName };
      });
      let manteqData = manteqRes.data.map((item: any) => {
        return { id: item.ManteqaID, name: item.ManteqaName };
      });
      let workData = workRes.data.map((item: any) => {
        return { id: item.WazeefaID, name: item.WazeefaName };
      });
      let dyanaData = dyanaRes.data.map((item: any) => {
        return { value: item.DyanaID, label: item.DyanaName };
      });
      let typeData = typeRes.data.map((item: any) => {
        return { value: item.PersonTypeID, label: item.PersonType };
      });
      setGovs(govData);
      setManateq(manteqData);
      setWazayef(workData);
      setReligion(dyanaData);
      setTypes(typeData);

      let response = await axios.get(
        `/api/employee/getEmployee?PersonCode=${code}`
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
      const { ManteqaLookup, MohafzatLookup, PersonAddress } = employeeAddress;
      const { PersonWazeefa } = employeeWazeefa;
      const { MobileNumber } = employeeMobile;
      const { CurrentMorattab, PersonMorattabDareebaPercentage } =
        employeeMoratab;
      setBirthDate(new Date(PersonTaree5Milad));
      setAssignDate(new Date(PersonTaree5Ta3yeen));

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
      onGovChange(MohafzatLookup.MohafzaName);
      onDistrictChange(ManteqaLookup.ManteqaName);
      setMobileN(MobileNumber);
      setSalary(CurrentMorattab);
      onWorkChange(PersonWazeefa.WazeefaName);
      setDyana(PersonDyanaId);
      setType(PersonTypeId);
      setDraybPercent(PersonMorattabDareebaPercentage);
    };
    fetchData();
  }, [code]);
  const saveEmployee = async (e: any) => {
    e.preventDefault();
    const wazefaId = wazayef.find(
      (item: { name: string; id: number }) => item.name === work
    )!.id;
    const mohafzaId = govs.find(
      (item: { name: string; id: number }) => item.name === govVal
    )!.id;
    const manteqaId = manateq.find(
      (item: { name: string; id: number }) => item.name === district
    )!.id;
    let response = await axios.post("/api/employee/update", {
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
      PersonManteqaID: manteqaId,
      PersonMohafzaID: mohafzaId,
      PersonDyana: dyana,
      PersonType: type,
      PersonTa2meenValue: insuranceVal,
      PersonAddress: address,
      /* Beta2aWesh: bta2aFace.fileInfo?.name,
      Beta2aDahr: bta2aDahr.fileInfo?.name,
      Feesh: feesh.fileInfo?.name,
      ShehadetMilad: birthCertificate.fileInfo?.name,
      ShehadetGeish: tagneedCertificate.fileInfo?.name,
      PersonContract: contractImage.fileInfo?.name, */
      CurrentMorattab: salary,
      MobileNumber: mobileNo,
      PersonWazeefa: wazefaId,
      PersonMorattabDareebaPercentage: draybPercent,
    });
  };
  return (
    <>
      <div className="bg-gray-100">
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
        <h1 className="p-10 text-3xl text-center text-black font-display">
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
                  type='date'
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
                  type='date'
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
              <div className="flex flex-row justify-end ">
                <Dropdown
                  title="المحافظة"
                  options={govs}
                  value={govVal}
                  onChange={onGovChange}
                  isDisabled={!editdata}
                />
                <Dropdown
                  title="المنطقة"
                  options={manateq}
                  value={district}
                  isDisabled={!editdata}
                  onChange={onDistrictChange}
                />
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
            /*  condition={(val: number) =>
             1400 <= val && val <= 9600 ? true : false
           }
           errorMsg="برجاء ادخال رقم بين 1400 ل 9600" */
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



/* 

<h1 className="p-10 text-4xl text-center text-black pt-14 font-display">
بيانات شخصية
</h1>
<div className="grid justify-center grid-cols-2 px-4 mx-16 rounded-lg">
<div className="flex flex-col p-4 mt-3 space-y-10 text-right bg-white rounded-l-2xl">
  <TextField
    label="الكود"
    value={code}
    onChange={setCode}
    condition={(val: string) =>
      !Number.parseInt(val) && val != "" ? false : true
    }
    errorMsg="كود الموظف يجب أن يكون رقم"
  />
  <div className="flex flex-col p-4 mt-3 space-y-10 bg-white ">
    <div className="flex flex-row items-center justify-around">
      <DatePicker
        className="w-1/2 px-4 py-2 m-3 leading-tight text-center text-black border rounded "
        selected={birthDate}
        onChange={(date: Date) => setBirthDate(date)}
      />
      <h6 className="text-sm text-right text-gray-700">
        تاريخ الميلاد
      </h6>
    </div>
    <div className="flex flex-row items-center justify-between">
      <DatePicker
        className="w-full px-4 py-2 m-3 leading-tight text-right text-black border rounded appearance-none focus:outline-none focus:shadow-outline"
        selected={assignDate}
        onChange={(date: Date) => setAssignDate(date)}
      />
      <h6 className="text-sm text-right text-gray-700">
        تاريخ التعيين
      </h6>
    </div>
  </div>
  <div className="flex flex-col justify-around bg-white ">
    <div className="flex flex-row justify-end ">
      <Dropdown
        title="المحافظة"
        options={govs}
        onChange={onGovChange}
        value={govVal}
      />
      <Dropdown
        title="المنطقة"
        options={manateq}
        value={district}
        onChange={onDistrictChange}
      />
    </div>
    <TextField label="العنوان" value={address} onChange={setAddress} />
  </div>
  <div className="flex flex-row items-center justify-end bg-white rounded-lg ">
    <Dropdown
      title="الوظيفة"
      options={wazayef}
      value={work}
      onChange={onWorkChange}
    />
    <label className="p-2 text-sm text-right text-gray-700 ">
      الوظيفة
    </label>
  </div>
  <RadioButtonComp
    label="الديانة"
    options={religion}
    onChange={setDyana}
    value={dyana}
  />
  <RadioButtonComp
    label="النوع"
    options={types}
    onChange={setType}
    value={type}
  />
</div>
<div className="flex flex-col p-4 mt-3 space-y-10 text-right bg-white justify-space-between rounded-r-2xl">
  <CustomizableTextField
    label="الاسم"
    placeholders={[
      "الاسم الرابع",
      "الاسم الثالث",
      "الاسم الثاني",
      "الاسم الاول",
    ]}
    values={[fourthN, thirdN, secondN, firstN]}
    onChange={[setFourthN, setThirdN, setSecondN, setFirstN]}
  />
  <TextField
    label="رقم المحمول"
    value={mobileNo}
    condition={(val: string) => {
      if (val == "") return true;
      if (!Number.parseInt(val)) return false;
      if (val.length != 11) return false;
      if (Number.parseInt(val) < 0) return false;

      return true;
    }}
    errorMsg="رقم المحمول يجب أن يكون 11 رقم "
    onChange={setMobileN}
  />
  <TextField
    label="الرقم القومي"
    value={nationlNo}
    onChange={setNationalNo}
    condition={(val: string) => {
      if (val == "") return true;
      if (!Number.parseInt(val)) return false;

      if (val.length != 14) return false;

      if (Number.parseInt(val) < 0) return false;
      return true;
    }}
    errorMsg="الرقم القومي يجب أن يكون 14 رقم "
  />
  <TextField
    label="رقم التليفون الأرضي"
    value={landlineNo}
    onChange={setLandlineNo}
    condition={(val: string) => {
      if (val == "") return true;
      if (!Number.parseInt(val)) return false;

      if (val.length < 10 || val.length > 11) return false;

      if (Number.parseInt(val) < 0) return false;

      return true;
    }}
    errorMsg="رقم التيليفون يجب ان يكون من 10 او 11 رقم"
  />
  <TextField
    label="الرقم التأميني"
    value={insuranceNo}
    onChange={setInsuranceNo}
    condition={(val: string) => {
      if (val == "") return true;
      if (!Number.parseInt(val)) return false;
      if (val.length != 9) return false;
      if (Number.parseInt(val) < 0) return false;
      if (Number.parseInt(val) < 0) return false;

      return true;
    }}
    errorMsg="الرقم التأميني يجب ان يكون 9 ارقام "
  />
  <TextField
    label="قيمة التأمين"
    defaultValue={"1400"}
    condition={(val: string) => {
      if (val == "") return true;
      let number = Number.parseInt(val);
      if (!number) return false;
      if (1400 <= number && number <= 9600) return true;
      return false;
    }}
    errorMsg="برجاء ادخال رقم بين 1400 ل 9600"
    value={insuranceVal}
    onChange={setInsuranceVal}
  />
  <TextField
    label="عدد سنوات التأمين"
    value={insuranceYears}
    onChange={setInsuranceYear}
    condition={(val: string) => {
      if (val == "") return true;
      let number = Number.parseInt(val);
      if (!number) return false;
      if (Number.parseInt(val) < 0) return false;
      return true;
    }}
    errorMsg={"برجاء ادخال رقم"}
  />

  <TextField
    label="المرتب"
    value={salary}
    onChange={setSalary}
    condition={(val: string) => {
      if (val == "") return true;
      let number = Number.parseInt(val);
      if (!number) return false;
      if (Number.parseInt(val) < 0) return false;
      return true;
    }}
    errorMsg={"برجاء ادخال رقم"}
  />
  <TextField
    label="نسبة الضرائب"
    value={draybPercent.toString()}
    onChange={setDraybPercent}
    /*  condition={(val: number) =>
       1400 <= val && val <= 9600 ? true : false
     }
     errorMsg="برجاء ادخال رقم بين 1400 ل 9600" */
