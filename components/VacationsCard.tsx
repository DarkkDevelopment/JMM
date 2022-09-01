import "react-toastify/dist/ReactToastify.css";
import axios from "../utils/axios";
import React, { useState } from "react";
import { AgazaHistory } from "../interfaces/Vactaions";
import Dropdown from "./DropDownComp";
import monthDays from "../utils/monthDays";
import { Alert } from "../services/alerts/Alert";

interface Props {
  name: string;
  code: number;
  availableVacations: number;
  history: AgazaHistory[];
  reload: CallableFunction;
  agazatConst: any[];
}

function VacationsCard(props: Props) {
  const { name, code, availableVacations, history, reload, agazatConst } =
    props;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selected, setSelected] = useState<string | undefined>(
    agazatConst[0].name
  );

  const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  const didnotPassed = (date: Date) => {
    let todaysDate = new Date();
    if (date.getFullYear() > todaysDate.getFullYear()) {
      return true;
    } else {
      if (date.getMonth() > todaysDate.getMonth()) {
        return true;
      } else if (date.getMonth() < todaysDate.getMonth()) {
        return false;
      } else {
        if (date.getDate() >= todaysDate.getDate()) {
          return true;
        }
      }
    }
    return false;
  };
  const sendVacation = async () => {
    if (selected) {
      let tempDate = new Date(startDate);
      var dateArray = new Array();
      while (tempDate < endDate) {
        let addedDate = new Date(tempDate);
        dateArray.push(addedDate);
        tempDate = addDays(tempDate, 1);
      }
      if (endDate.getDate() !== startDate.getDate()) {
        dateArray.push(endDate);
      } else {
        dateArray.push(endDate);
      }

      let agazaId = agazatConst.find((obj: any) => selected === obj.name).id;
      console.log(dateArray);
      await Promise.all(
        dateArray.map(async (date) => {
          console.log(new Date(date));
          console.log(code);
          console.log(agazaId);
          await axios({
            method: "post",
            url: "/api/HR_Endpoints//vacations/createNewVacation",
            data: {
              PersonCode: code,
              AgazaTypeId: agazaId,
              AgazaDate: date,
            },
          });
        })
      )
        .then(() => {
          Alert.Success("تم اضافة الاجازة بنجاح");
          setTimeout(() => reload(), 2500);
        })
        .catch((err) => {
          Alert.Error("حدث خطأ اثناء اضافة الاجازة");
        });
    } else {
      Alert.Error("برجاء اختيار نوع الاجازة");
    }
  };

  const deleteVacation = async (id: number) => {
    await axios
      .post("/api/HR_Endpoints//vacations/deleteVacation", {
        id,
      })
      .then(() => {
        Alert.Success("تم حذف الاجازة بنجاح");
        setTimeout(() => reload(), 1500);
      })
      .catch((err) => {
        Alert.Error("حدث خطأ اثناء حذف الاجازة");
      });
  };

  const calculateVacationDays = () => {
    if (
      endDate.getMonth() < startDate.getMonth() ||
      endDate.getFullYear() < startDate.getFullYear()
    ) {
      return -1;
    }

    if (endDate.getMonth() > startDate.getMonth()) {
      let days = 0;
      let endmonth = endDate.getMonth();
      let startmonth = startDate.getMonth();
      let endyear = endDate.getFullYear();
      let startyear = startDate.getFullYear();
      while (endmonth > startmonth || endyear > startyear) {
        if (endmonth === 0) {
          endmonth = 11;
          endyear--;
        } else {
          endmonth--;
        }
        console.log(new Date(endyear, endmonth, 0).getDate());

        days += new Date(endyear, endmonth, monthDays[endmonth]).getDate();
      }
      return days + endDate.getDate() - startDate.getDate();
    } else {
      return endDate.getDate() - startDate.getDate();
    }
  };
  return (
    <div className="flex flex-row bg-gray-100 ">
      <div className="font-display basis-[96.285%] ">
        <div className="flex flex-col items-center px-5 space-y-10 bg-white shadow-lg rounded-3xl font-display">
          <h3 className="mt-10 text-3xl text-center text-black font-display">
            {name}
          </h3>

          <p>الكود : {code}</p>
          <p>عدد الاجازات المتاحة : {availableVacations}</p>
          <div className="grid justify-center grid-cols-2 ">
            <div className="mr-24 ">
              <div className="flex flex-col items-center space-y-5 text-center text-black pt-14 font-display">
                <h6 className="text-xl text-center text-black pl-52 font-display">
                  الاجازات السابقة
                </h6>
                {history.length > 0 ? (
                  <table
                    className="text-right border-collapse table-auto font-display w-[20vw]
          
        "
                  >
                    <thead className="text-right text-black border-2 border-t-0 border-l-0 border-r-0 border-b-black">
                      <tr>
                        <th></th>
                        <th>النوع</th>
                        <th>التاريخ</th>
                      </tr>
                    </thead>
                    <tbody className="text-right ">
                      {history.map((hist) => {
                        return (
                          <tr key={hist.id}>
                            <button
                              className="w-5 text-white bg-red-500 font-display hover:bg-red-700"
                              onClick={() => {
                                deleteVacation(hist.id);
                              }}
                            >
                              x
                            </button>

                            <td>{hist.AgazaType.AgazaType}</td>
                            <td>{hist.AgazaDate.toString().slice(0, 10)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <h1 className="text-xl">لا يوجد اجازات سابقة</h1>
                )}
              </div>
            </div>

            <div className="flex flex-col ">
              <h5 className="space-x-10 text-xl text-right text-black pr-44 font-display">
                الايام المطلوبة
              </h5>

              <div className="flex flex-row mt-5 ml-28">
                <h6 className="text-xl text-black pr-60 font-display">الي</h6>
                <h6 className="text-xl text-black font-display">من</h6>
              </div>

              <div className="flex flex-row mt-5 mr-62 ">
                <input
                  type="date"
                  className="m-3 px-4 py-2 text-center appearance-none border rounded w-[15vw]  text-black leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setEndDate(new Date(e.target.value));
                  }}
                  value={endDate.toISOString().slice(0, 10)}
                />
                <input
                  type="date"
                  className="m-3 px-4 py-2 text-center appearance-none border rounded w-[15vw]  text-black leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setStartDate(new Date(e.target.value));
                  }}
                  value={startDate.toISOString().slice(0, 10)}
                />
              </div>

              {calculateVacationDays() < 0 ? (
                <h5 className="mt-2 text-xl font-bold text-center text-red-600">
                  برجاء ادخال التاريخ بشكل صحيح
                </h5>
              ) : calculateVacationDays() + 1 > availableVacations ? (
                <h5 className="mt-2 text-xl font-bold text-center text-red-600">
                  الاجازات المتاحة لا تكفي
                </h5>
              ) : (
                calculateVacationDays() + 1 <= availableVacations && (
                  <div className="flex flex-col items-center pt-4">
                    <div className=" mt-2.5   ">
                      <Dropdown
                        title="نوع الاجازة"
                        options={agazatConst}
                        value={selected}
                        onChange={setSelected}
                      />
                    </div>

                    <h5 className="mt-12 text-xl text-center text-black font-display">
                      اجمالي عدد الايام المطلوبة
                    </h5>

                    <h1 className="mt-2 text-3xl text-center text-black font-display ">
                      {calculateVacationDays() + 1}
                    </h1>
                    <h1 className="mt-2 text-center text-black font-display ">
                      <button
                        className="m-3 mb- 5 px-4 py-2 font-bold text-center  shadow appearance-none border rounded w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-900"
                        onClick={sendVacation}
                      >
                        موافقة
                      </button>
                    </h1>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VacationsCard;
