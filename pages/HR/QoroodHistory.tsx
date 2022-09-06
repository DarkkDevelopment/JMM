import React from "react";
import { InferGetServerSidePropsType } from "next";

function QoroodHistory(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const QoroodHistory = props.data;
  return (
    <div className="flex flex-col justify-center pt-10 pl-10 pr-10 mr-32 bg-white shadow-xl space-y-7">
      <h1 className="items-center self-center justify-center p-3 text-3xl font-bold text-center rounded-xl ">
        سجل القروض
      </h1>
      <table className="text-center border-collapse table-auto font-display">
        <thead className="text-center text-white bg-blue-900">
          <tr>
            <th className="w-20 p-4 text-center border-b-2 ">
              القيمة المتبقية
            </th>
            <th className="w-20 p-4 text-center border-b-2 ">
              تاريخ صرف القرض
            </th>
            <th className="w-20 p-4 text-center border-b-2 ">قيمة القرض</th>
            <th className="w-20 p-4 text-center border-b-2 ">الاسم</th>
            <th className="w-20 p-4 text-center border-b-2 ">#</th>
          </tr>
        </thead>
        <tbody>
          {QoroodHistory.map((qard: any, index: number) => (
            <tr key={qard.QardId}>
              <td className="p-4 border-b-2 border-gray-200">
                {qard.Remaining}
              </td>
              <td className="p-4 border-b-2 border-gray-200">
                {new Date(qard.QardRequestDate).toLocaleDateString()}
              </td>
              <td className="p-4 border-b-2 border-gray-200">
                {qard.QardValue}
              </td>
              <td className="p-4 border-b-2 border-gray-200">
                {qard.PersonName.PersonFirstName +
                  " " +
                  qard.PersonName.PersonSecondName +
                  " " +
                  qard.PersonName.PersonThirdName +
                  " " +
                  qard.PersonName.PersonFourthName}
              </td>
              <td className="p-4 border-b-2 border-gray-200">{++index}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// todo : here we should get the Qorood History for all the Employees

export async function getServerSideProps(context: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/qorood/get`
  );
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default QoroodHistory;
