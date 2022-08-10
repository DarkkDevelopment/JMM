import React, { useState, useEffect } from "react";
import Dropdown from "../components/DropDownComp";
import FileCheck from "../components/FileCheck";
import RadioButtonComp from "../components/RadioButtonComp";
import TextField from "../components/TextField";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import CustomizableTextField from "../components/CustomizableTextField";
import axios from "axios";
import employeeFormValidator from "../services/validators/employeeFormValidator";

interface FileModel {
  uploaded: boolean;
  fileInfo: File | null;
}

function AddEmployee() {
  const [error, setError] = useState("");

  // input states

  const [code, setCode] = useState("");
  const [address, setAddress] = useState("");
  const [firstN, setFirstN] = useState("");
  const [secondN, setSecondN] = useState("");
  const [thirdN, setThirdN] = useState("");
  const [fourthN, setFourthN] = useState("");
  const [mobileNo, setMobileN] = useState("");
  const [nationlNo, setNationalNo] = useState("");
  const [landlineNo, setLandlineNo] = useState("");
  const [insuranceNo, setInsuranceNo] = useState("");
  const [insuranceVal, setInsuranceVal] = useState("");
  const [insuranceYears, setInsuranceYear] = useState("");
  const [salary, setSalary] = useState("");
  const [govs, setGovs] = useState<{ name: string; id: number }[]>([]);
  const [manateq, setManateq] = useState<{ name: string; id: number }[]>([]);
  const [religion, setReligion] = useState([]);
  const [types, setTypes] = useState([]);
  const [wazayef, setWazayef] = useState<{ name: string; id: number }[]>([]);
  const [birthDate, setBirthDate] = useState(new Date());
  const [assignDate, setAssignDate] = useState(new Date());
  const [draybPercent, setDraybPercent] = useState<"" | number>("");
  const [agazaLimit, setAgazaLimit] = useState("");

  const [govVal, onGovChange] = useState(undefined);
  const [district, onDistrictChange] = useState(undefined);
  const [work, onWorkChange] = useState(undefined);

  const [dyana, setDyana] = useState(undefined);
  const [type, setType] = useState(undefined);

  const [bta2aFace, setBta2aFace] = useState<FileModel>({
    uploaded: false,
    fileInfo: null,
  });
  const [bta2aDahr, setBta2aDahr] = useState<FileModel>({
    uploaded: false,
    fileInfo: null,
  });

  const [feesh, setFeesh] = useState<FileModel>({
    uploaded: false,
    fileInfo: null,
  });

  const [birthCertificate, setBirthCertificate] = useState<FileModel>({
    uploaded: false,
    fileInfo: null,
  });

  const [tagneedCertificate, setTagneedCertficate] = useState<FileModel>({
    uploaded: false,
    fileInfo: null,
  });

  const [contractImage, setContractImage] = useState<FileModel>({
    uploaded: false,
    fileInfo: null,
  });

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
    
    onGovChange(govData[0].name);
    onDistrictChange(manteqData[0].name);
    onWorkChange(workData[0].name);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e: any) => {
    e.preventDefault();
    setError("");
    let employee = {
      PersonCode: code,
      PersonDyana: dyana,
      PersonFirstName: firstN,
      PersonFourthName: fourthN,
      PersonRaqamQawmy: nationlNo,
      PersonRaqamTa2meeny: insuranceNo,
      PersonSanawatTa2meen: insuranceYears,
      PersonSecondName: secondN,
      PersonTa2meenValue: insuranceVal,
      PersonTaree5Milad: birthDate,
      PersonTaree5Ta3yeen: assignDate,
      PersonThirdName: thirdN,
      PersonType: type,
      PersonAddress: address,
      ManteqaLookup: district,
      MohafzatLookup: govVal,
      agazaLimit,
      work,
      salary,
      mobileNo,
      bta2aFace,
      feesh,
      bta2aDahr,
      birthCertificate,
      tagneedCertificate,
      contractImage,
    };
    console.log(employee);
    let error = {
      response: true,
      message: "",
    };
    //employeeFormValidator(employee);
    if (!error.response) {
      setError(error.message!);
    } else {
      const wazefaId = wazayef.find(
        (item: { name: string; id: number }) => item.name === work
      )!.id;
      const mohafzaId = govs.find(
        (item: { name: string; id: number }) => item.name === govVal
      )!.id;
      const manteqaId = manateq.find(
        (item: { name: string; id: number }) => item.name === district
      )!.id;

      let response = await axios.post("/api/employee/create", {
        PersonCode: Number.parseInt(code),
        PersonFirstName: firstN,
        PersonSecondName: secondN,
        PersonThirdName: thirdN,
        PersonFourthName: fourthN,
        PersonRaqamQawmy: nationlNo,
        PersonRaqamTa2meeny: insuranceNo,
        PersonTelephoneArdy: landlineNo,
        PersonTaree5Milad: birthDate,
        PersonTaree5Ta3yeen: assignDate,
        PersonSanawatTa2meen: Number.parseInt(insuranceYears),
        PersonManteqaID: manteqaId,
        PersonMohafzaID: mohafzaId,
        PersonDyana: dyana,
        PersonType: type,
        PersonTa2meenValue: Number.parseInt(insuranceVal),
        PersonAddress: address,
        Beta2aWesh: bta2aFace.fileInfo?.name,
        Beta2aDahr: bta2aDahr.fileInfo?.name,
        Feesh: feesh.fileInfo?.name,
        ShehadetMilad: birthCertificate.fileInfo?.name,
        ShehadetGeish: tagneedCertificate.fileInfo?.name,
        PersonContract: contractImage.fileInfo?.name,
        CurrentMorattab: Number.parseInt(salary),
        MobileNumber: mobileNo,
        PersonWazeefa: wazefaId,
        NumberOfAgazaDays: Number.parseInt(agazaLimit),
      });
      console.log(response);
      if (response.status == 200) alert(response.data.message);
      else setError(response.data.message);
    }
  };

  return (
    <>
      <div className="bg-gray-100 font-display">
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
            <div className="flex flex-col space-y-10 bg-white ">
              <div className="flex flex-row mr-4 pt-0.5">
                <DatePicker
                  className="px-4 py-2 m-3 leading-tight text-center text-black border rounded w-80 "
                  selected={birthDate}
                  onChange={(date: Date) => setBirthDate(date)}
                />

                <div className="flex flex-row items-center ml-32">
                  <h6 className="self-center text-lg text-right text-gray-700">
                    تاريخ الميلاد
                  </h6>
                </div>
              </div>

              <div className="flex flex-row pt-4 mr-4">
                <DatePicker
                  className="px-4 py-2 m-3 leading-tight text-center text-black border rounded w-80 "
                  selected={assignDate}
                  onChange={(date: Date) => setAssignDate(date)}
                />

                <div className="flex flex-row items-center ml-32">
                  <h6 className="self-center text-lg text-right text-gray-700 ">
                    تاريخ التعيين
                  </h6>
                </div>
              </div>
              <div className=" pt-9">
                <RadioButtonComp
                  label="الديانة"
                  options={religion}
                  onChange={setDyana}
                  value={dyana}
                />
              </div>
              <div className=" pt-9">
                <RadioButtonComp
                  label="النوع"
                  options={types}
                  onChange={setType}
                  value={type}
                />
              </div>
            </div>
            <div className="flex flex-row items-center justify-end pt-8 mr-2 space-x-64 bg-white rounded-lg">
              <Dropdown
                title="الوظيفة"
                options={wazayef}
                value={work}
                onChange={onWorkChange}
              />
              <label className="self-center p-2 text-lg text-right text-gray-700 ">
                الوظيفة
              </label>
            </div>

            <div className="flex flex-row justify-around pt-10 ml-24 bg-white rounded-lg space-x-28">
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
            <TextField
              label="الحد الاقصي للاجازات في السنة"
              value={agazaLimit.toString()}
              onChange={setAgazaLimit}
            />
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
            <label className="self-center p-2 text-lg text-right text-gray-700 ">
              العنوان
            </label>
          </div>
          <div className="pt-2 item-right">
            <TextField label="الشارع" value={address} onChange={setAddress} />
          </div>
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
          />
        </div>
      </div>
      <div className="flex flex-col justify-center mt-10 text-center ">
        <h1 className="justify-center mb-5 text-3xl text-center text-black font-display">
          ملفات الموظف
        </h1>
      </div>
      <div className="flex flex-col p-10 mt-5 ml-20 mr-20 space-y-10 text-right bg-white justify-space-between rounded-2xl">
        <div className="grid self-center justify-center grid-cols-2 grid-rows-6">
          <div className="flex flex-row self-center justify-between p-5 bg-white ">
            <FileCheck isUploaded={bta2aFace.uploaded} />

            <div>
              <input
                className="w-full text-right border border-gray-300 rounded-lg focus:outline-blue-500"
                type="file"
                accept={"image/*, .pdf"}
                onChange={(e) => {
                  let files = e.target.files as FileList;
                  if (!files || files.length > 0) {
                    setBta2aFace({
                      fileInfo: files[0],
                      uploaded: true,
                    });
                  } else {
                    console.log(files);
                  }
                }}
              />
            </div>
          </div>
          <label className="self-center mr-20 text-right text-gray-700 text-md">
            وجه البطاقة
          </label>

          <div className="flex flex-row self-center justify-between p-5 bg-white ">
            <FileCheck isUploaded={bta2aDahr.uploaded} />

            <div>
              <input
                className="w-full text-right border border-gray-300 rounded-lg focus:outline-blue-500"
                type="file"
                accept={"image/*, .pdf"}
                onChange={(e) => {
                  let files = e.target.files as FileList;
                  if (!files || files.length > 0) {
                    setBta2aDahr({
                      fileInfo: files[0],
                      uploaded: true,
                    });
                  } else {
                    console.log(files);
                  }
                }}
              />
            </div>
          </div>
          <label className="self-center mr-20 text-right text-gray-700 text-md">
            ظهر البطاقة
          </label>
          <div className="flex flex-row self-center justify-between p-5 bg-white ">
            <FileCheck isUploaded={feesh.uploaded} />

            <div>
              <input
                className="w-full text-right border border-gray-300 rounded-lg focus:outline-blue-500"
                type="file"
                accept={"image/*, .pdf"}
                onChange={(e) => {
                  let files = e.target.files as FileList;
                  if (!files || files.length > 0) {
                    setFeesh({
                      fileInfo: files[0],
                      uploaded: true,
                    });
                  } else {
                    console.log(files);
                  }
                }}
              />
            </div>
          </div>
          <label className="self-center mr-20 text-right text-gray-700 text-md">
            فيش جنائي
          </label>
          <div className="flex flex-row self-center justify-between p-5 bg-white ">
            <FileCheck isUploaded={birthCertificate.uploaded} />

            <div>
              <input
                className="w-full text-right border border-gray-300 rounded-lg focus:outline-blue-500"
                type="file"
                accept={"image/*, .pdf"}
                onChange={(e) => {
                  let files = e.target.files as FileList;
                  if (!files || files.length > 0) {
                    setBirthCertificate({
                      fileInfo: files[0],
                      uploaded: true,
                    });
                  } else {
                    console.log(files);
                  }
                }}
              />
            </div>
          </div>
          <label className="self-center mr-20 text-right text-gray-700 text-md">
            شهادة الميلاد
          </label>
          <div className="flex flex-row self-center justify-between p-5 bg-white ">
            <FileCheck isUploaded={tagneedCertificate.uploaded} />

            <div>
              <input
                className="w-full text-right border border-gray-300 rounded-lg focus:outline-blue-500"
                type="file"
                accept={"image/*, .pdf"}
                onChange={(e) => {
                  let files = e.target.files as FileList;
                  if (!files || files.length > 0) {
                    setTagneedCertficate({
                      fileInfo: files[0],
                      uploaded: true,
                    });
                  } else {
                    console.log(files);
                  }
                }}
              />
            </div>
          </div>
          <label className="self-center mr-20 text-right text-gray-700 text-md ">
            شهادة التجنيد
          </label>
          <div className="flex flex-row self-center justify-between p-5 bg-white ">
            <FileCheck isUploaded={contractImage.uploaded} />

            <div>
              <input
                className="w-full text-right border border-gray-300 rounded-lg focus:outline-blue-500"
                type="file"
                accept={"image/*, .pdf"}
                onChange={(e) => {
                  let files = e.target.files as FileList;
                  if (!files || files.length > 0) {
                    setContractImage({
                      fileInfo: files[0],
                      uploaded: true,
                    });
                  } else {
                    console.log(files);
                  }
                }}
              />
            </div>
          </div>
          <label className="self-center mr-20 text-right text-gray-700 text-md">
            صورة العقد
          </label>
          <div className="flex items-center justify-center p-5 mt-10 text-center">
            {error ? <h1 className="text-3xl text-red-600 ">{error}</h1> : null}
          </div>
          <div className="flex items-center justify-center w-32 p-5 mt-10 mb-10 text-center ">
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded shadow-lg hover:bg-blue-700"
              onClick={handleSave}
            >
              حفظ
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
