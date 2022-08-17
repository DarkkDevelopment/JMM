import axios from "axios";
import React, { useState } from "react";
import { hawafezHistoryForPerson } from "../models/hawafezModel";
import Dropdown from "./DropDownComp";
import TextField from "./TextField";


function IncentiveCard(props: any) {
    const { name, totalIncentive, title, hwafezReasons, PersonCode, history, lastMonthClosed, lastYearClosed,deleteHafez } = props;
    const [hafez, setHafez] = useState(hwafezReasons[0].name);
    const [money, setMoney] = useState('');

    

    const sendHafez = async (e: any) => {
        e.preventDefault();
        let today = new Date();
        let hafezId = hwafezReasons.find((x: any) => x.name === hafez).id;
        let response = await axios.post('/api/HR_Endpoints//hawafez/create?type=pureHafez', {
            PureHafezValue: Number.parseFloat(money),
            DayOfHafez: today.getDate(),
            MonthOfHafez: today.getMonth() + 1,
            YearOfHafez: today.getFullYear(),
            SubmitPersonCode: PersonCode,
            PersonHafezId: PersonCode,
            HafezReasonID: hafezId,
        });
        console.log(response.data);
        window.location.reload();
    }

    return (
        <div className="flex flex-col items-center p-10 space-y-10 bg-white rounded-3xl shadow-lg font-display">
            <h3 className="mt-10 text-3xl text-center text-black font-display">
                {name}
            </h3>

            <p>
                اجمالي مبلغ ال{title} في الشهر : {totalIncentive}
            </p>
            <div className='flex flex-row justify-evenly'>
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
                        {history.map((hist: hawafezHistoryForPerson) => {
                            return (
                                <tr key={hist.hafezId}>

                                    {
                                    lastYearClosed != null || lastMonthClosed != null ?
                                            lastMonthClosed < new Date().getMonth() + 1 || lastYearClosed < new Date().getFullYear() ?
                                                (
                                                    <>
                                                        <button
                                                            className="w-5 text-white bg-red-500 font-display hover:bg-red-700"
                                                            onClick={() => {
                                                                deleteHafez(hist.hafezId);
                                                                //   deleteVacation(hist.id);
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


                                    <td>{hist.HafezValue}</td>
                                    <td>{`${hist.YearOfHafez}-${hist.MonthOfHafez}-${hist.DayOfHafez}`}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex font-display ml-4">
                    <div className=" mt-7 ">
                        <Dropdown options={hwafezReasons} title='الحوافز' onChange={setHafez} value={hafez} />
                    </div>


                    <div className="ml- ">
                        <TextField label="ادخل المبلغ" value={money} onChange={setMoney} />
                    </div>
                </div>


            </div>
            <button
                onClick={sendHafez}
                className="m-3 px-4 py-2 text-center shadow appearance-none border w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-900 rounded-3xl ">
                تم
            </button>
        </div >
    );
}

export default IncentiveCard;
