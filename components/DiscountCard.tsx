import axios from "axios";
import React, { useState } from "react";
import Dropdown from "./DropDownComp";
import TextField from "./TextField";

function DiscountCard(props: any) {
  const { name, totalKhasminThatMonth, title, discountReasons, PersonCode } =
    props;
  const [discount, setDiscount] = useState(discountReasons[0].name);
  const [money, setMoney] = useState("");

  const sendHafez = async (e: any) => {
    e.preventDefault();
    let discountId = discountReasons.find((x: any) => x.name === discount).id;

    let today = new Date();
    console.log({
      PureKhasmValue: Number.parseFloat(money),
      DayOfKhasm: today.getDate(),
      MonthOfKhasm: today.getMonth() + 1,
      YearOfKhasm: today.getFullYear(),
      SubmitPersonCode: PersonCode,
      PersonKhasmId: PersonCode,
      KhasmReasonID: discountId,
    });

    let response = await axios.post("/api/khasm/create?type=pureKhasm", {
      PureKhasmValue: Number.parseFloat(money),
      DayOfKhasm: today.getDate(),
      MonthOfKhasm: today.getMonth() + 1,
      YearOfKhasm: today.getFullYear(),
      SubmitPersonCode: PersonCode,
      PersonKhasmId: PersonCode,
      KhasmReasonID: discountId,
    });
    console.log(response.data);
  };

  return (
    <div className="flex flex-col items-center p-10 space-y-10 mr-10 bg-white shadow-lg rounded-3xl font-display">
      <h3 className="mt-10 text-3xl text-center text-black font-display">
        {name}
      </h3>

      <p>
        اجمالي مبلغ ال{title} في الشهر : {totalKhasminThatMonth}
      </p>

      <div className="flex flex-row justify-between flex-1 w-3/4 align-baseline font-display ">
       
      </div>








        <div className="flex flex-row align-baseline justify-between font-display space-x-64 ">
            <div className=" mt-7 ">
            <Dropdown
          options={discountReasons}
          title="اسباب الخصم"
          onChange={setDiscount}
          value={discount}
        />
       
            </div>
            
                
                <div className="ml- ">
                <TextField label="ادخل المبلغ" value={money} onChange={setMoney} />
            </div>
            </div>


      <button
        onClick={sendHafez}
        className="m-3 px-4 py-2 text-center shadow appearance-none border rounded w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-900 "
      >
        تم
      </button>
    </div>
  );
}

export default DiscountCard;
