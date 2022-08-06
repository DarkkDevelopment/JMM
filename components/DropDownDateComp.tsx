import React, { useEffect, useState } from "react";
import Dropdown from "./DropDownComp";
import MonthSeed from "../utils/MonthsSeed";
type Props = {
  month: string;
  year: string;
  setYear: CallableFunction;
  setMonth: CallableFunction;
};
export const DropDownDateComp = (props: Props) => {
  const { month, year, setMonth, setYear } = props;
  const [years, setYears] = useState<{ id: number; name: string }[]>([]);

  const fillArr = () => {
    let years = [];
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      years.push({ id: i, name: i.toString() });
    }
    setYears(years);
  };
  useEffect(() => {
    fillArr();
  }, []);

  return (
    <div className="flex flex-row space-x-10">
      <Dropdown options={years} title="السنة" onChange={setYear} value={year} />
      <Dropdown
        options={MonthSeed}
        title="الشهر"
        onChange={setMonth}
        value={month}
      />
    </div>
  );
};
