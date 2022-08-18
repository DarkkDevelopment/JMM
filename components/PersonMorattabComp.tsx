import axios from "axios";
import React, { useEffect, useState } from "react";
import MonthSeed from "../utils/MonthsSeed";
import Dropdown from "./DropDownComp";
import { NoDataComponent } from "./NoDataComponent";
import TextField from "./TextField";

type Props = {
  personId: number;
};

export const PersonMorattabComp = (props: Props) => {
  const { personId } = props;
  const [personData, setPersonDate] = useState<any | null>(null);
  const [month, setMonth] = useState<string>(
    MonthSeed.find((month) => month.id === new Date().getMonth() + 1)!.name
  );
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [years, setYears] = useState<{ id: number; name: string }[]>([]);

  const fillArr = () => {
    let years = [];
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      years.push({ id: i, name: i.toString() });
    }
    setYears(years);
  };

  useEffect(() => {
    const fetchData = async () => {
      const monthNo = MonthSeed.find((monthh) => monthh.name === month)!.id;
      console.log(monthNo, year);
      const res = await axios.post("/api/payrol/getPayrolHistoryByCode", {
        code: personId,
        month: monthNo,
        year: Number.parseInt(year),
      });
      setPersonDate(res.data);
    };
    fillArr();
    fetchData();
  }, [year, month, personId]);
  return (
    <div className="flex flex-col w-1/2 p-4 mt-3 mb-4 space-y-10 text-center bg-white rounded-lg">
      <h1 className="text-3xl text-center text-black font-display">
        المرتبات
      </h1>
      <div className="flex flex-row items-center justify-center space-x-5 text-center text-black font-display">
        <Dropdown
          title="السنة"
          value={year}
          options={years}
          onChange={setYear}
        />
        <Dropdown
          title="الشهر"
          onChange={setMonth}
          value={month}
          options={MonthSeed}
        />
      </div>
      {personData == null ? (
        <NoDataComponent />
      ) : (
        <>
          <h1 className="text-3xl text-center text-black font-display">
            المرتبات
          </h1>

          <div className="flex flex-row items-center justify-center space-x-5 text-center text-black font-display">
            <div className="flex flex-col items-center justify-center space-y-5 text-center text-black font-display">
              <div className="flex flex-row items-center justify-center space-x-5 text-center text-black font-display">
                <h6 className="text-center text-black text-md font-display">
                  {personData?.PersonMorattabAtThatMonth}
                </h6>
                <h6 className="text-center text-black text-md font-display">
                  أساس المرتب
                </h6>
              </div>
              <div className="flex flex-row items-center justify-center space-x-5 text-center text-black font-display">
                <h6 className="text-center text-black text-md font-display">
                  {personData?.PersonMorattabAtThatMonth +
                    personData?.TotalHafezSummationValue -
                    personData?.NetSalary}
                </h6>
                <h6 className="text-center text-black text-md font-display">
                  الخصومات
                </h6>
              </div>
              <div className="flex flex-row items-center justify-center space-x-5 text-center text-black font-display">
                <h6 className="text-center text-black text-md font-display">
                  {personData?.TotalHafezSummationValue}
                </h6>
                <h6 className="text-center text-black text-md font-display">
                  الحوافز
                </h6>
              </div>
              <div className="flex flex-row items-center space-x-5 text-center text-black justify-evenly font-display">
                <h6 className="text-center text-black text-md font-display">
                  {personData?.NetSalary}
                </h6>
                <h6 className="text-center text-black text-md font-display">
                  الاجمالي
                </h6>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
