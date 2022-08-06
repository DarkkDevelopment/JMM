import axios from "axios";
import React, { useState } from "react";

function LoansCard(props: any) {
  const { name, limit, code, LastSolfaDate, remainingAmount } = props;

  const LastSolfaaDate = new Date(LastSolfaDate);
  const [value, setValue] = useState('');
  const sendSolfa = async (e: any) => {
    e.preventDefault();
    const response = await axios.post('/api/loan/createLoan', {
      PersonCode: code,
      SolfaValue: Number.parseInt(value),
      SolfaRequestDate: new Date(),
      SolfaMonthToBeApplied: new Date().getMonth() + 1,
      SolfaYearToBeApplied: new Date().getFullYear(),
    })
    alert(response.data);
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
