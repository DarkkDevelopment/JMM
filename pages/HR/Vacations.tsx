import React, { useEffect, useState } from "react";
import SearchField from "../../components/searchField";
import SideBar from "../../components/sideBar";
import VacationsCard from "../../components/VacationsCard";
import { IAllEmployeesModel } from "../../interfaces/employees";
import { Vacatoion } from "../../interfaces/Vactaions";
import { InferGetServerSidePropsType } from "next";
import { ToastContainer } from "react-toastify";
import TSB from "../../components/TSB";

function Vacations(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const empVacations = props.empVacation;
  const agazaTypes = props.agazatValues;
  const [filteredEmployees, setFilteredEmployees] = useState<Vacatoion[]>([]);
  const [searchterm, setSearchTerm] = useState("");
  const [agazat, setAgazat] = useState([]);

  useEffect(() => {
    setFilteredEmployees(empVacations);
    setAgazat(agazaTypes);
  }, [agazaTypes, empVacations]);

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-row bg-gray-100 ">
      <div className="flex justify-center pr-10 m-10 font-display basis-5/6">
        <ToastContainer />
        <div className="flex flex-col justify-center space-y-6 ">
          {filteredEmployees.map((obj: Vacatoion) => (
            <VacationsCard
              key={obj.PersonCode}
              name={obj.PersonName}
              code={obj.PersonCode}
              availableVacations={obj.NumberOfAgazaDays}
              history={obj.history}
              reload={refreshPage}
              agazatConst={agazat}
            />
          ))}
        </div>
      </div>
      <TSB pageName="vacations" />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/employee/getAll`
  );
  const employeesData = await response.json();
  const agazatConst = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/lookupsData/getDataFromLookups/agazaTypes`
  );
  const agazaConstJson = await agazatConst.json();
  let agazatValues = agazaConstJson.map((obj: any) => {
    return { name: obj.AgazaType, id: obj.AgazaTypeID };
  });
  let employees: IAllEmployeesModel[] = employeesData;
  let empVacation: Vacatoion[] = [];
  // todo : convert it to fetch instead of axios
  await Promise.all(
    employees.map(async (emp: IAllEmployeesModel) => {
      let resp = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/vacations/getVacationsHistory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PersonCode: emp.PersonCode,
          }),
        }
      );
      const vacationHistory = await resp.json();

      let agazaLimitResp = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/vacations/getVacationsLimit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            PersonCode: emp.PersonCode,
            year: new Date().getFullYear(),
          }),
        }
      );
      const AgazaLimits = await agazaLimitResp.json();
      let data: Vacatoion = {
        PersonCode: emp.PersonCode,
        PersonName:
          emp.PersonFirstName +
          " " +
          emp.PersonSecondName +
          " " +
          emp.PersonThirdName +
          " " +
          emp.PersonFourthName,
        history: vacationHistory.data.history,
        NumberOfAgazaDays:
          AgazaLimits.NumberOfAgazaDays - vacationHistory.data.history.length,
      };
      empVacation.push(data);
    })
  );

  return {
    props: {
      empVacation,
      agazatValues,
    },
  };
}

export default Vacations;
