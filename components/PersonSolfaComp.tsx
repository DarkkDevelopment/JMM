import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "./DropDownComp";

type Props = {
  PersonCode: number;
};
export const PersonSolfaComp = (props: Props) => {
  const { PersonCode } = props;
  const [personData, setPersonDate] = useState<any | null>(null);
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
      const response = await axios.post("/api/loan/getLoanHistoryByCode", {
        code: PersonCode,
        year: Number.parseInt(year),
      });
      setPersonDate(response.data);
    };
    fillArr();
    fetchData();
  }, [PersonCode, year]);

  return (
    <div className="flex flex-col justify-center w-1/2 p-4 mt-3 space-y-10 text-center bg-white rounded-lg">
      <div className="flex flex-row items-center justify-center space-x-5 text-center text-black font-display">
        <Dropdown
          title="السنة"
          value={year}
          options={years}
          onChange={setYear}
        />
      </div>
      {personData == null || personData.length == 0 ? (
        <h1 className="text-2xl">لا يوجد سلف</h1>
      ) : (
        <>
          <h1 className="text-3xl text-center text-black font-display">
            السلفات السابقة
          </h1>
          <div className="flex flex-row items-center justify-between w-full p-2 space-x-3 text-center text-black font-display">
            <p className="text-2xl font-bold">تم الدفع</p>
            <p className="text-2xl font-bold">المبلغ</p>
            <p className="text-2xl font-bold">التاريخ</p>
          </div>
          {personData.map((item: any) => {
            let solfaDate = new Date(item.SolfaRequestDate);
            return (
              <div
                key={item.SolfaRequestDate}
                className="flex flex-row items-center justify-between w-full p-2 space-x-3 text-center text-black font-display"
              >
                <p className="text-lg">{item.IsDoneAndPaid ? "نعم" : "لا"}</p>
                <p className="text-lg">{item.SolfaValue}</p>
                <p className="text-lg">
                  {solfaDate.getFullYear()}-{solfaDate.getMonth()}-
                  {solfaDate.getDate()}
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
