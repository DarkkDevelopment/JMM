import React from "react";
import Dropdown from "../../components/DropDown";
import { InferGetServerSidePropsType } from "next";
import axios from "../../utils/axios";

function CreateSadad(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const AllEmployees = props ? props.employeesOptions : [];
  const [sadadValue, setSadadValue] = React.useState(0);
  const [employee, setEmployee] = React.useState(0);
  const [QoroodOptions, setQoroodOptions] = React.useState<
    [
      {
        id: number;
        name: string;
      }
    ]
  >([
    {
      id: 0,
      name: "اختر القرض",
    },
  ]);
  const [qard, setQard] = React.useState(0);

  // todo: need to use this to filter the qorood with the selected employee code
  const handleChangeEmployee = async (code: number) => {
    const response = await axios({
      method: "POST",
      url: "/api/HR_Endpoints/qorood/getQoroodByCode",
      data: {
        code: code,
      },
    });
    setEmployee(code);
    const qoroodOptions = response.data.map((qorood: any) => {
      return {
        id: qorood.id,
        name:
          qorood.TotalQardValue +
          " L.E  :  " +
          new Date(qorood.QardRequestDate).toLocaleDateString(),
      };
    });
    setQoroodOptions(qoroodOptions);
  };

  // todo: this to handle the creation logic
  const handleCreateSadad = async (e: any) => {
    e.preventDefault();
    if (QoroodOptions.length === 1) {
      const response = await axios({
        method: "POST",
        url: "/api/HR_Endpoints/ozonat/create",
        data: {
          QardId: QoroodOptions[0].id,
          EznValue: sadadValue,
        },
      });
      console.log(response);
    } else {
      const response = await axios({
        method: "POST",
        url: "/api/HR_Endpoints/ozonat/create",
        data: {
          QardId: qard,
          EznValue: sadadValue,
        },
      });
      console.log(response);
    }
    //window.location.reload();
  };

  const handleQardChange = (id: number) => {
    setQard(id);
  };

  return (
    <div className="flex flex-col ">
      <h1 className="items-center self-center justify-center p-3 mb-12 text-3xl font-bold text-center rounded-xl">
        صفحة سداد قروض
      </h1>
      <form action="#" onSubmit={handleCreateSadad}>
        <div className="flex flex-col items-center justify-center p-4 m-4 text-xl font-bold text-center bg-white shadow-xl mt-36 space-y-7 rounded-3xl">
          <div className="flex flex-row mb-4 space-x-10">
            <Dropdown
              title="الموظف"
              options={AllEmployees}
              value={employee}
              onChange={handleChangeEmployee}
            />
            <label className="text-2xl " htmlFor="name">
              الاسم
            </label>
          </div>
          <div className="flex flex-row mb-4 space-x-10">
            <Dropdown
              title="القرض"
              options={QoroodOptions}
              value={qard}
              onChange={handleQardChange}
            />
            <label className="text-2xl " htmlFor="name">
              القرض
            </label>
          </div>
          <div className="flex flex-row mb-4 space-x-10">
            <input
              value={sadadValue}
              onChange={(e) => setSadadValue(Number(e.target.value))}
              className="w-1/2 px-5 py-3 m-auto text-xl font-bold text-center text-white bg-blue-900 rounded-lg shadow-xl cursor-pointer hover:bg-blue-500"
            />
            <label className="text-2xl " htmlFor="name">
              قيمة السداد
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
  const getQoroodHistory = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/qorood/get`
  );
  const getQoroodHistoryJson = await getQoroodHistory.json();
  let employeesOptions: any = [
    {
      id: 0,
      name: "اختر الموظف",
    },
  ];
  let QoroodOptions: any = [
    {
      id: 0,
      name: "اختر القرض",
    },
  ];
  for (const employee of getQoroodHistoryJson) {
    if (
      employeesOptions.filter((e: any) => e.id === employee.PersonCode)
        .length === 0
    ) {
      employeesOptions.push({
        id: employee.PersonCode,
        name:
          employee.PersonName.PersonFirstName +
          " " +
          employee.PersonName.PersonSecondName +
          " " +
          employee.PersonName.PersonThirdName +
          " " +
          employee.PersonName.PersonFourthName,
      });
    }
  }
  return {
    props: {
      employeesOptions,
    },
  };
}

export default CreateSadad;
