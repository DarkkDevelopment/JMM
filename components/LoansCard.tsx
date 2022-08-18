import React, { useState } from "react";
import axios from "axios";
import { solfaHistoryForPerson, SolfaModel } from "../models/SolfaModel";

function LoansCard(props: any) {
  const {
    name,
    limit,
    code,
    history,
    lastMonthClosed,
    lastYearClosed,
    deleteSolfa,
  } = props;

  const [value, setValue] = useState(0);
  const sendSolfa = async (e: any) => {
    e.preventDefault();
    if (value > limit) {
      alert("المبلغ المدخل اكبر من الحد الاقصى المسموح به");
      return;
    }
    if (value < 0) {
      alert("المبلغ المدخل اقل من الصفر");
      return;
    }
    if (value === 0) {
      alert("المبلغ المدخل يجب ان يكون اكبر من الصفر");
      return;
    }
    // todo i will put here the checking function first
    const checkForLastLoans = await axios({
      method: "post",
      url: "/api/HR_Endpoints/loan/check",
      data: {
        code: code,
        date: new Date(),
      },
    });

    if (checkForLastLoans.data === false) {
      const response = await axios.post("/api/HR_Endpoints/loan/createLoan", {
        PersonCode: code,
        SolfaValue: value,
        SolfaRequestDate: new Date(),
        SolfaMonthToBeApplied: new Date().getMonth() + 1,
        SolfaYearToBeApplied: new Date().getFullYear(),
      });

      if (response.status == 200) {
        alert("تمت العملية بنجاح");
        window.location.reload();
      } else {
        alert("حدث خطأ حاول مرة اخرى");
      }
    } else {
      alert("لا يمكنك ادخال سلفة لهذا الشهر");
    }
  };
  return (
    <div className="flex flex-col p-10 space-y-10 bg-white shadow-lg rounded-3xl font-display">
      <h2 className="mt-10 text-6xl text-center text-black font-display">
        {name}
      </h2>
      <h3 className="text-2xl text-center text-black font-display">
        الكود : {code}
      </h3>
      <div className="flex flex-row items-center justify-between space-x-32">
        <div className="flex flex-col items-center justify-between space-y-10">
          <table className="text-right border-collapse table-auto font-display w-[20vw]">
            <thead className="text-right text-black border-2 border-t-0 border-l-0 border-r-0 border-b-black">
              <tr>
                <th></th>
                <th>القيمة</th>
                <th>التاريخ</th>
              </tr>
            </thead>
            <tbody className="text-right ">
              {history.map((hist: solfaHistoryForPerson) => {
                return (
                  <tr key={hist.solfaId}>
                    {lastYearClosed != null || lastMonthClosed != null ? (
                      lastMonthClosed < new Date().getMonth() + 1 ||
                      lastYearClosed < new Date().getFullYear() ? (
                        <>
                          <button
                            className="w-5 text-white bg-red-500 font-display hover:bg-red-700"
                            onClick={() => {
                              deleteSolfa(hist.solfaId);
                            }}
                          >
                            x
                          </button>
                        </>
                      ) : (
                        <td></td>
                      )
                    ) : (
                      <>
                        <button
                          className="w-5 text-white bg-red-500 font-display hover:bg-red-700"
                          onClick={() => {
                            deleteSolfa(hist.solfaId);
                          }}
                        >
                          x
                        </button>
                      </>
                    )}
                    {/*
                  // todo : need to fix this one
                */}
                    <td>{hist.solfaValue}</td>
                    <td>{hist.solfaRequestDate.toString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col text-center text-black font-display">
          <h4 className="mt-10 text-2xl text-center text-black font-display">
            الحد الأقصي للسلفة : {limit}
          </h4>
          <input
            className=" ml-16 mt-6 p-2 text-center shadow appearance-none border rounded w-[10vw]  text-black leading-tight focus:outline-blue-500 focus:shadow-outline"
            id="quantity"
            type="text"
            placeholder="ادخل المبلغ"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-row justify-center ">
        <button
          onClick={sendSolfa}
          className="m-3 px-4 py-2 text-center shadow appearance-none border rounded w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-900"
        >
          موافقة
        </button>
      </div>
    </div>
  );
}

export default LoansCard;
