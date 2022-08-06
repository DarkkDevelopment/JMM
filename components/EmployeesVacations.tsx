import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeVacation from "./EmployeeVacation";
type Props = {
  personCode: number;
};

export const EmployeesVacations = (props: Props) => {
  const [year, setYear] = useState<number>(2022);
  const [vacations, setVacations] = useState<{ [key: number]: Array<{}> }>({});

  useEffect(() => {
    const fetchAgaze = async () => {
      const response = await axios.post("/api/vacations/getVacationsHistory", {
        personCode: props.personCode,
      });
      const vacationsResponse = response.data.data.history;
      let newVacations: { [key: number]: Array<{}> } = {};
      for (let i = 1; i <= 12; i++) newVacations[i] = [];
      vacationsResponse.forEach((vacation: { AgazaDate: Date }) => {
        let date = new Date(vacation.AgazaDate);
        let vacationYear = date.getFullYear();
        let vacationMonth = date.getMonth() + 1;
        if (year === vacationYear) {
          newVacations[vacationMonth].push(vacation);
        }
      });
      setVacations(newVacations);
    };
    fetchAgaze();
  }, [props.personCode, year]);

  return (
    <div className="bg-white">
      <h1 className="p-10 text-3xl text-center text-black font-display">
        الاجازات
      </h1>
      <div className="grid justify-center grid-rows-3 gap-5 shadow-lg ">
        <div className="flex flex-row p-4 mt-3 space-x-10 text-right bg-white rounded-lg ">
          <EmployeeVacation month={4} agazat={vacations[4] || []} />
          <EmployeeVacation month={3} agazat={vacations[3] || []} />
          <EmployeeVacation month={2} agazat={vacations[2] || []} />
          <EmployeeVacation month={1} agazat={vacations[1] || []} />
        </div>
        <div className="flex flex-row p-4 mt-3 space-x-10 text-right bg-white rounded-lg ">
          <EmployeeVacation month={8} agazat={vacations[8] || []} />
          <EmployeeVacation month={7} agazat={vacations[7] || []} />
          <EmployeeVacation month={6} agazat={vacations[6] || []} />
          <EmployeeVacation month={5} agazat={vacations[5] || []} />
        </div>
        <div className="flex flex-row p-4 mt-3 space-x-10 text-right bg-white rounded-lg ">
          <EmployeeVacation month={12} agazat={vacations[12] || []} />
          <EmployeeVacation month={11} agazat={vacations[11] || []} />
          <EmployeeVacation month={10} agazat={vacations[10] || []} />
          <EmployeeVacation month={9} agazat={vacations[9] || []} />
        </div>
        <div className="flex flex-row justify-center p-4 mt-3 space-x-10 text-right bg-white rounded-lg">
          <a
            onClick={() => {
              if (year! > 0) {
                setYear(year - 1);
              }
            }}
          >
            <ChevronLeftIcon className="w-8 h-8 text-gray-500 cursor-pointer hover:text-gray-700" />
          </a>
          <h3 className="text-xl text-center text-gray-700 font-display">
            {year}
          </h3>
          <a
            onClick={() => {
              setYear(year + 1);
            }}
          >
            <ChevronRightIcon className="w-8 h-8 text-gray-500 cursor-pointer hover:text-gray-700" />
          </a>
        </div>
      </div>
    </div>
  );
};
