import React from "react";
import { InferGetServerSidePropsType } from "next";

// @ts-ignore
function SadadatHistory(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const SadadatHistory = props ? props.SadadatHistoryData : [];
  console.log(SadadatHistory);
  return (
    <div className="flex flex-col justify-center pt-10 pl-10 pr-10 mr-32 bg-white shadow-xl space-y-7">
      <h1 className="items-center self-center justify-center p-3 text-3xl font-bold text-center rounded-xl ">
        سجل السدادات
      </h1>
      <table className="text-center border-collapse table-auto font-display">
        <thead className="text-center text-white bg-blue-900">
          <tr>
            <th className="w-20 p-4 text-center border-b-2 ">التاريخ</th>
            <th className="w-20 p-4 text-center border-b-2 ">القيمة</th>
            <th className="w-20 p-4 text-center border-b-2 ">الاسم</th>
            <th className="w-20 p-4 text-center border-b-2 ">رقم الاذن</th>
          </tr>
        </thead>
        <tbody>
          {SadadatHistory.map((sadad: any, index: number) => (
            <tr key={sadad.id}>
              <td className="p-4 border-b-2 border-gray-200">
                {sadad.EznDate}
              </td>
              <td className="p-4 border-b-2 border-gray-200">
                {sadad.EznValue}
              </td>
              <td className="p-4 border-b-2 border-gray-200">
                {sadad.Qard.Person.PersonFirstName +
                  " " +
                  sadad.Qard.Person.PersonSecondName +
                  " " +
                  sadad.Qard.Person.PersonThirdName +
                  " " +
                  sadad.Qard.Person.PersonFourthName}
              </td>
              <td className="p-4 border-b-2 border-gray-200">{++index}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// todo : we need to get the sadadat History here

export async function getServerSideProps(context: any) {
  const SadadatHistory = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/ozonat/get`
  );
  const SadadatHistoryJson = await SadadatHistory.json();
  return {
    props: {
      SadadatHistoryData: SadadatHistoryJson,
    },
  };
}

export default SadadatHistory;
