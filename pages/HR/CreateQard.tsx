import React, { useState } from "react";
import Dropdown from "../../components/DropDown";
import { InferGetServerSidePropsType } from "next";
import axios from "../../utils/axios";

function CreateQard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const AllEmployees = props ? props.employees : [];
  const [employee, setEmployee] = useState(0);
  const [qardValue, setQardValue] = useState(0);

  // todo : this for calling the create Qard endpoint
  const handleCreateQard = async (e: any) => {
    e.preventDefault();
    const newQard = await axios({
      method: "POST",
      url: "/api/HR_Endpoints/qorood/create",
      data: {
        PersonCode: employee,
        QardValue: qardValue,
      },
    });
    console.log(newQard);
    // todo: to be changed to route to saf7et qorood el sherka 3mtn kolaha
    window.location.reload();
  };
  return (
    <div className="flex flex-col ">
      <h1 className="items-center self-center justify-center p-3 mb-12 text-3xl font-bold text-center rounded-xl">
        صفحة صرف قروض
      </h1>
      <form action="#" onSubmit={handleCreateQard}>
        <div className="flex flex-col items-center justify-center p-4 m-4 text-xl font-bold text-center bg-white shadow-xl mt-36 space-y-7 rounded-3xl">
          <div className="flex flex-row mb-4 space-x-10">
            <Dropdown
              title="الموظف"
              options={AllEmployees}
              value={employee}
              onChange={(value: React.SetStateAction<number>) =>
                setEmployee(value)
              }
            />
            <label className="text-2xl " htmlFor="name">
              الاسم
            </label>
          </div>
          <div className="flex flex-row mb-4 space-x-10">
            <input
              value={qardValue}
              onChange={(e) => setQardValue(Number(e.target.value))}
              className="w-1/2 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
            />
            <label className="text-2xl " htmlFor="name">
              قيمة القرض
            </label>
          </div>
          <button
            type="submit"
            className="px-5 py-3 m-4 text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer w-1/8 hover:bg-blue-500"
          >
            حفظ
          </button>
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  // we need to get employees their code and name only
  const employees = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/employee/getAll`
  );
  const employeesJson = await employees.json();
  let employeesOptions: any = [
    {
      id: 0,
      name: "اختر الموظف",
    },
  ];
  for (const employee of employeesJson) {
    employeesOptions.push({
      id: employee.PersonCode,
      name:
        employee.PersonFirstName +
        " " +
        employee.PersonSecondName +
        " " +
        employee.PersonThirdName +
        " " +
        employee.PersonFourthName,
    });
  }
  return {
    props: {
      employees: employeesOptions,
    },
  };
}

export default CreateQard;
