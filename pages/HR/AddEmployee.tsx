import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";

import FileCheck from "../../components/FileCheck";
import RadioButtonComp from "../../components/RadioButtonComp";
import TextField from "../../components/TextField";
import CustomizableTextField from "../../components/CustomizableTextField";
import axios from "axios";
import { sendEmployee } from "../../services/employeesServices";
import {
  getManateqByMohafzaIdService,
  getMohafzatService,
} from "../../services/constantsService";
import Dropdown from "../../components/DropDown";
import { ToastContainer } from "react-toastify";
import { Alert } from "../../services/alerts/Alert";
import { useRouter } from "next/router";

interface FileModel {
  uploaded: boolean;
  fileInfo: File | null;
}

// @ts-ignore
function AddEmployee(props) {
  const [error, setError] = useState("");
  const router = useRouter();

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

  const [govVal, onGovChange] = useState<number | undefined>(undefined);
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
    const govRes = await getMohafzatService();

    const manteqRes = await getManateqByMohafzaIdService(
      govRes.data[0].id || 0
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
    setManateq(manteqRes.data);
    setWazayef(workData);
    setReligion(dyanaData);
    setTypes(typeData);

    onGovChange(govRes.data[0].id || undefined);
    onDistrictChange(manteqRes.data[0].id || undefined);
    onWorkChange(workData[0].id || 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGovChange = async (val: number) => {
    const res = await getManateqByMohafzaIdService(val);
    onGovChange(val);
    setManateq(res.data);
    if (res.data.length > 0) onDistrictChange(res.data[0].id);
  };

  const handleSave = async (e: any) => {
    e.preventDefault();

    let emp = {
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
      PersonManteqaID: district,
      PersonMohafzaID: govVal,
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
      PersonWazeefa: work,
      NumberOfAgazaDays: Number.parseInt(agazaLimit),
    };
    const response = await sendEmployee(emp);

    if (response.success) {
      Alert.Success("???? ?????????? ???????????? ??????????");
      router.push("/HR/Employees");
    } else {
      Alert.Error(response.message!);
    }
  };

  return (
    <div className="bg-gray-100 font-display">
      <h1 className="p-10 text-4xl text-center text-black pt-14 font-display">
        ???????????? ??????????
      </h1>
      <div className="grid justify-center grid-cols-2 px-4 mx-16 rounded-lg">
        <div className="flex flex-col p-4 mt-2 space-y-10 text-right bg-white rounded-l-2xl">
          <TextField
            label="??????????"
            value={code}
            onChange={setCode}
            condition={(val: string) =>
              !Number.parseInt(val) && val != "" ? false : true
            }
            errorMsg="?????? ???????????? ?????? ???? ???????? ??????"
          />
          <div className="flex-col mt-3 space-y-10 text-right bg-white rounded-lg lex ">
            <div className="flex flex-row items-center justify-between p-4 pl-40">
              <input
                type="date"
                className="w-1/2 px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                onChange={(e) => setBirthDate(new Date(e.target.value))}
                value={birthDate.toISOString().split("T")[0]}
              />

              <div className="flex flex-row items-center ml-32">
                <h6 className="self-center text-lg text-right text-gray-700">
                  ?????????? ??????????????
                </h6>
              </div>
            </div>

            <div className="flex flex-row items-center justify-between p-4 pl-40">
              <input
                type="date"
                className="w-1/2 px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                onChange={(e) => setAssignDate(new Date(e.target.value))}
                value={assignDate.toISOString().split("T")[0]}
              />

              <div className="flex flex-row items-center ml-32">
                <h6 className="self-center text-lg text-right text-gray-700 ">
                  ?????????? ??????????????
                </h6>
              </div>
            </div>
            <div className="flex flex-row justify-end p-4 mt-3 bg-white rounded-lg">
              <RadioButtonComp
                label="??????????????"
                options={religion}
                onChange={setDyana}
                value={dyana}
              />
            </div>
            <div className="flex flex-row justify-end p-4 mt-3 bg-white rounded-lg">
              <RadioButtonComp
                label="??????????"
                options={types}
                onChange={setType}
                value={type}
              />
            </div>
            <div className="flex flex-row justify-between p-4 py-4 pl-40 mt-3 bg-white rounded-lg">
              <Dropdown
                title="??????????????"
                options={wazayef}
                value={work}
                onChange={onWorkChange}
              />
              <label className="self-center text-lg text-right text-gray-700">
                ??????????????
              </label>
            </div>

            <div className="flex flex-row justify-between p-4 pl-40 mt-3">
              <Dropdown
                title="????????????????"
                options={govs}
                onChange={handleGovChange}
                value={govVal}
              />

              <Dropdown
                title="??????????????"
                options={manateq}
                value={district}
                onChange={onDistrictChange}
              />
            </div>
            <div>
              <TextField
                label="??????????????"
                value={address}
                onChange={setAddress}
              />
              <TextField
                label="???????? ???????????? ???????????????? ???? ??????????"
                value={agazaLimit.toString()}
                onChange={setAgazaLimit}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 mt-2 space-y-10 text-right bg-white justify-space-between rounded-r-2xl">
          <CustomizableTextField
            label="??????????"
            placeholders={[
              "?????????? ????????????",
              "?????????? ????????????",
              "?????????? ????????????",
              "?????????? ??????????",
            ]}
            values={[fourthN, thirdN, secondN, firstN]}
            onChange={[setFourthN, setThirdN, setSecondN, setFirstN]}
          />
          <TextField
            label="?????? ??????????????"
            value={mobileNo}
            condition={(val: string) => {
              if (val == "") return true;
              if (!Number.parseInt(val)) return false;
              if (val.length != 11) return false;
              if (Number.parseInt(val) < 0) return false;

              return true;
            }}
            errorMsg="?????? ?????????????? ?????? ???? ???????? 11 ?????? "
            onChange={setMobileN}
          />
          <TextField
            label="?????????? ????????????"
            value={nationlNo}
            onChange={setNationalNo}
            condition={(val: string) => {
              if (val == "") return true;
              if (!Number.parseInt(val)) return false;

              if (val.length != 14) return false;

              if (Number.parseInt(val) < 0) return false;
              return true;
            }}
            errorMsg="?????????? ???????????? ?????? ???? ???????? 14 ?????? "
          />
          <TextField
            label="?????? ???????????????? ????????????"
            value={landlineNo}
            onChange={setLandlineNo}
          />
          <TextField
            label="?????????? ????????????????"
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
            errorMsg="?????????? ???????????????? ?????? ???? ???????? 9 ?????????? "
          />
          <TextField
            label="???????? ??????????????"
            defaultValue={"1400"}
            condition={(val: string) => {
              if (val == "") return true;
              let number = Number.parseInt(val);
              if (!number) return false;
              if (1400 <= number && number <= 9600) return true;
              return false;
            }}
            errorMsg="?????????? ?????????? ?????? ?????? 1400 ?? 9600"
            value={insuranceVal}
            onChange={setInsuranceVal}
          />
          <TextField
            label="?????? ?????????? ??????????????"
            value={insuranceYears}
            onChange={setInsuranceYear}
            condition={(val: string) => {
              if (val == "") return true;
              let number = Number.parseInt(val);
              if (!number) return false;
              if (Number.parseInt(val) < 0) return false;
              return true;
            }}
            errorMsg={"?????????? ?????????? ??????"}
          />

          <TextField
            label="????????????"
            value={salary}
            onChange={setSalary}
            condition={(val: string) => {
              if (val == "") return true;
              let number = Number.parseInt(val);
              if (!number) return false;
              if (Number.parseInt(val) < 0) return false;
              return true;
            }}
            errorMsg={"?????????? ?????????? ??????"}
          />
          <TextField
            label="???????? ??????????????"
            value={draybPercent.toString()}
            onChange={setDraybPercent}
          />
        </div>
        <div className="flex flex-col col-start-1 col-end-3 px-5 mx-auto mt-5 space-y-10 text-right bg-white justify-space-between rounded-2xl">
          <div className="flex flex-col justify-center mt-10 text-center ">
            <h1 className="justify-center text-3xl text-center text-black font-display">
              ?????????? ????????????
            </h1>
          </div>
          <div className="grid self-center justify-center grid-cols-2 grid-rows-6">
            <div className="flex flex-row self-center justify-between p-5 bg-white ">
              <FileCheck isUploaded={bta2aFace.uploaded} />

              <div>
                <input
                  className="w-full ml-2 text-right border border-gray-300 focus:outline-blue-500"
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
            <label className="self-center mr-10 text-right text-gray-700 text-md">
              ?????? ??????????????
            </label>

            <div className="flex flex-row self-center justify-between p-5 bg-white ">
              <FileCheck isUploaded={bta2aDahr.uploaded} />

              <div>
                <input
                  className="w-full ml-2 text-right border border-gray-300 focus:outline-blue-500"
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
            <label className="self-center mr-10 text-right text-gray-700 text-md">
              ?????? ??????????????
            </label>
            <div className="flex flex-row self-center justify-between p-5 bg-white ">
              <FileCheck isUploaded={feesh.uploaded} />

              <div>
                <input
                  className="w-full ml-2 text-right border border-gray-300 focus:outline-blue-500"
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
            <label className="self-center mr-10 text-right text-gray-700 text-md">
              ?????? ??????????
            </label>
            <div className="flex flex-row self-center justify-between p-5 bg-white ">
              <FileCheck isUploaded={birthCertificate.uploaded} />

              <div>
                <input
                  className="w-full ml-2 text-right border border-gray-300 focus:outline-blue-500"
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
            <label className="self-center mr-10 text-right text-gray-700 text-md">
              ?????????? ??????????????
            </label>
            <div className="flex flex-row self-center justify-between p-5 bg-white ">
              <FileCheck isUploaded={tagneedCertificate.uploaded} />

              <div>
                <input
                  className="w-full ml-2 text-right border border-gray-300 focus:outline-blue-500"
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
            <label className="self-center mr-10 text-right text-gray-700 text-md ">
              ?????????? ??????????????
            </label>
            <div className="flex flex-row self-center justify-between p-5 bg-white ">
              <FileCheck isUploaded={contractImage.uploaded} />

              <div>
                <input
                  className="w-full ml-2 text-right border border-gray-300 focus:outline-blue-500"
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
            <label className="self-center mr-10 text-right text-gray-700 text-md">
              ???????? ??????????
            </label>
            <div className="flex items-center justify-center p-5 mt-10 text-center">
              {error ? (
                <h1 className="text-3xl text-red-600 ">{error}</h1>
              ) : null}
            </div>
            <div className="flex items-center justify-center w-32 p-5 text-center ">
              <button
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded shadow-lg hover:bg-blue-700"
                onClick={handleSave}
              >
                ??????
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
