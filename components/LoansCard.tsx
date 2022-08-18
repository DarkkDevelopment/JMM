import React, { useState } from "react";
import axios from "axios";
import { solfaHistoryForPerson, SolfaModel } from "../models/SolfaModel";
import { Alert } from "../services/alerts/Alert";

function LoansCard(props: any) {
  const { name, limit, code, LastSolfaDate, remainingAmount, history, lastMonthClosed, lastYearClosed, deleteSolfa } = props;

  const LastSolfaaDate = new Date(LastSolfaDate);
  const [value, setValue] = useState('');
  const sendSolfa = async (e: any) => {
    e.preventDefault();
    let solfaValue = Number.parseInt(value)
    if (solfaValue > limit) {
      Alert.Error("المبلغ المدخل اكبر من الحد الاقصى المسموح به")
      return
    }
    if (solfaValue < 0) {
      Alert.Error("المبلغ المدخل اقل من الصفر")
      return
    }
    if (solfaValue === 0) {
      Alert.Error("المبلغ المدخل يجب ان يكون اكبر من الصفر")
      return
    }
    if (new Date(LastSolfaaDate).getMonth() === new Date().getMonth() && new Date(LastSolfaaDate).getFullYear() === new Date().getFullYear()) {
      Alert.Error("لا يمكن طلب سلفة لهذا الشهر")
      return
    }
    const response = await axios.post('/api/HR_Endpoints/loan/createLoan', {
      PersonCode: code,
      SolfaValue: solfaValue,
      SolfaRequestDate: new Date(),
      SolfaMonthToBeApplied: new Date().getMonth() + 1,
      SolfaYearToBeApplied: new Date().getFullYear(),
    }).then(() => {
      Alert.Success("تم ارسال الطلب بنجاح")
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }).catch((err) => {
      Alert.Error('حدث خطأ حاول مرة اخرى');
    });
  }
  return (
    <div className="flex flex-col justify-center p-10 space-y-10 bg-white rounded-3xl shadow-lg font-display">
      <h2 className="mt-10 text-6xl text-center text-black font-display">
        {name}
      </h2>
      <h3
        className="
        text-2xl
        text-center
        text-black
        font-display
      "
      >
        الكود : {code}
      </h3>
      <div className="flex flex-row space-x-96">
        <div className="flex flex-col items-center justify-center text-center text-black font-display space-y-10">
          <div className="flex flex-row items-center justify-center text-center text-black font-display space-x-5">
            <p>
              {LastSolfaDate ? LastSolfaaDate.toLocaleDateString() : "لا يوجد"}
            </p>
            <h6
              className="
            text-md
            text-center
            text-black font-display"
            >
              تاريخ اخر سلفة
            </h6>
          </div>
          <div className="flex flex-row items-center justify-center text-center text-black font-display space-x-5">
            <p
              className="
            text-md
            text-center
            text-black font-display
            "
            >
              {remainingAmount ? remainingAmount : "لا يوجد"}
            </p>
            <h6
              className="
              text-md
              text-center
              text-black font-display"
            >
              قيمة اخر سلفة
            </h6>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center text-black font-display space-y-10">
          <h4 className="mt-10 text-2xl text-center text-black font-display">
            الحد الأقصي للسلفة : {limit}
          </h4>
          <div className="flex flex-row justify-center space-y-10">
            <input
              className="mt-3 mb-3 px-4 py-2 text-right shadow appearance-none border rounded w-[10vw]  text-black leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              type="text"
              placeholder="ادخل المبلغ"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <table
        className="text-right border-collapse table-auto font-display w-[20vw]"
      >
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

                {
                  lastYearClosed != null || lastMonthClosed != null ?
                    lastMonthClosed < new Date().getMonth() + 1 || lastYearClosed < new Date().getFullYear() ?
                      (
                        <>
                          <button
                            className="w-5 text-white bg-red-500 font-display hover:bg-red-700"
                            onClick={() => {
                              deleteSolfa(hist.solfaId)
                            }}
                          >
                            x
                          </button>
                        </>
                      ) : (<td></td>) : (
                      <td>

                      </td>
                    )
                }


                <td>{hist.solfaValue}</td>
                <td>{`${hist.solfaRequestDate.getFullYear()}-${hist.solfaRequestDate.getMonth() + 1}-${hist.solfaRequestDate.getDate()}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex flex-row justify-center ">
        <button
          onClick={sendSolfa}
          className="m-3 px-4 py-2 text-center shadow appearance-none border rounded w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-900">
          موافقة
        </button>
      </div>
    </div>
  );
}

export default LoansCard;
