import axios from "axios";
import React, { useState } from "react";
import Dropdown from "./DropDownComp";
import TextField from "./TextField";


function IncentiveCard(props: any) {
    const { name, totalIncentive, title, hwafezReasons, PersonCode } = props;
    const [hafez, setHafez] = useState(undefined);
    const [money, setMoney] = useState('');

    const sendHafez = async (e: any) => {
        e.preventDefault();
        let today = new Date();
        let hafezId = hwafezReasons.find((x: any) => x.name === hafez).id;
        let response = await axios.post('/api/hawafez/create?type=pureHafez', {
            PureHafezValue: Number.parseFloat(money),
            DayOfHafez: today.getDate(),
            MonthOfHafez: today.getMonth() + 1,
            YearOfHafez: today.getFullYear(),
            SubmitPersonCode: PersonCode,
            PersonHafezId: PersonCode,
            HafezReasonID: hafezId,
        });
        console.log(response.data);
    }

    return (
        <div className="flex flex-col items-center p-10 space-y-10 bg-white rounded-3xl shadow-lg font-display">
            <h3 className="mt-10 text-3xl text-center text-black font-display">
                {name}
            </h3>

            <p>
                اجمالي مبلغ ال{title} في الشهر : {totalIncentive}
            </p>

            <div className="flex flex-row flex-1 w-3/4 align-baseline justify-between font-display ">
                <Dropdown options={hwafezReasons} title='الحوافز' onChange={setHafez} value={hafez} />
                <TextField label="ادخل المبلغ" value={money} onChange={setMoney} />
            </div>
            <button
                onClick={sendHafez}
                className="m-3 px-4 py-2 text-center shadow appearance-none border rounded w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-900 rounded-3xl ">
                تم
            </button>
        </div>
    );
}

export default IncentiveCard;
