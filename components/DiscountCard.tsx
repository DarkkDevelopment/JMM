import axios from "axios";
import React, { useState } from "react";
import { khasmHistoryForPerson } from "../models/khasmModel";
import { Alert } from "../services/alerts/Alert";
import Dropdown from "./DropDownComp";
import TextField from "./TextField";

function DiscountCard(props: any) {
  const { name, totalKhasminThatMonth, title, discountReasons, PersonCode, history, lastMonthClosed, lastYearClosed, deleteHafez } =
    props;
  const [discount, setDiscount] = useState(discountReasons[0].name);
  const [money, setMoney] = useState("");

  const sendHafez = async (e: any) => {
    e.preventDefault();
    let discountId = discountReasons.find((x: any) => x.name === discount).id;
    let khasmValue = parseInt(money);
    let today = new Date();
    if (khasmValue <= 0) {
      Alert.Error("الرجاء ادخال المبلغ بشكل صحيح");
      return;
    }
    if (lastYearClosed != null || lastMonthClosed != null) {
      if (lastMonthClosed < new Date().getMonth() + 1 || lastYearClosed < new Date().getFullYear()) {
        await axios.post("/api/HR_Endpoints//khasm/create?type=pureKhasm", {
          PureKhasmValue: khasmValue,
          DayOfKhasm: today.getDate(),
          MonthOfKhasm: today.getMonth() + 1,
          YearOfKhasm: today.getFullYear(),
          SubmitPersonCode: PersonCode,
          PersonKhasmId: PersonCode,
          KhasmReasonID: discountId
        }).then(() => {
          Alert.Success("تم اضافة الخصم بنجاح");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }).catch(err => {
          Alert.Error("حدث خطأ حاول مرة اخرى");
        });
        return;
      }
    } else {
      await axios.post("/api/HR_Endpoints//khasm/create?type=pureKhasm", {
        PureKhasmValue: khasmValue,
        DayOfKhasm: today.getDate(),
        MonthOfKhasm: today.getMonth() + 1,
        YearOfKhasm: today.getFullYear(),
        SubmitPersonCode: PersonCode,
        PersonKhasmId: PersonCode,
        KhasmReasonID: discountId
      }).then(() => {
        Alert.Success("تم اضافة الخصم بنجاح");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }).catch(err => {
        Alert.Error("حدث خطأ حاول مرة اخرى");
      });
      return;
    }
    Alert.Error('لا يمكن اضافة حافز لهذا الشهر برجاء انتظار الشهر القادم لاعطاء الخصم');

    /* let response = await axios.post("/api/HR_Endpoints//khasm/create?type=pureKhasm", {
      PureKhasmValue: Number.parseFloat(money),
      DayOfKhasm: today.getDate(),
      MonthOfKhasm: today.getMonth() + 1,
      YearOfKhasm: today.getFullYear(),
      SubmitPersonCode: PersonCode,
      PersonKhasmId: PersonCode,
      KhasmReasonID: discountId,
    }); */
    window.location.reload();
    //console.log(response.data);
  };

  return (
    <div className="flex flex-col items-center p-10 space-y-10 mr-10 bg-white shadow-lg rounded-3xl font-display">
      <h3 className="mt-10 text-3xl text-center text-black font-display">
        {name}
      </h3>

      <p>
        اجمالي مبلغ ال{title} في الشهر : {totalKhasminThatMonth}
      </p>

      <div className="flex flex-row align-baseline justify-between font-display space-x-64 ">
        <div className="mt-7">
          <Dropdown
            options={discountReasons}
            title="اسباب الخصم"
            onChange={setDiscount}
            value={discount}
          />

        </div>

        <div className="">
          <TextField label="ادخل المبلغ" value={money} onChange={setMoney} />
        </div>
      </div>
      <button
        onClick={sendHafez}
        className="m-3 px-4 py-2 text-center shadow appearance-none border rounded w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-900 "
      >
        تم
      </button>

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
          {history.map((hist: khasmHistoryForPerson) => {
            return (
              <tr key={hist.khasmId}>

                {
                  lastYearClosed != null || lastMonthClosed != null ?
                    lastMonthClosed < new Date().getMonth() + 1 || lastYearClosed < new Date().getFullYear() ?
                      (
                        <>
                          <button
                            className="w-5 text-white bg-red-500 font-display hover:bg-red-700"
                            onClick={() => {
                              deleteHafez(hist.khasmId);
                              //   deleteVacation(hist.id);
                            }}
                          >
                            x
                          </button>
                        </>
                      ) : (<td></td>) : (
                      <td>
                        <button
                          className="w-5 text-white bg-red-500 font-display hover:bg-red-700"
                          onClick={() => {
                            deleteHafez(hist.khasmId);
                            //   deleteVacation(hist.id);
                          }}
                        >
                          x
                        </button>
                      </td>
                    )
                }


                <td>{hist.khasmValue}</td>
                <td>{`${hist.YearOfHafez}-${hist.MonthOfHafez}-${hist.DayOfHafez}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DiscountCard;
