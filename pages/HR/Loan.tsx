import React, { useEffect, useState } from "react";
import LoansCard from "../../components/LoansCard";
import SearchField from "../../components/searchField";
import SideBar from "../../components/sideBar";
import { SolfaModel } from "../../models/SolfaModel";
import { InferGetServerSidePropsType } from "next";

function Loan(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const filteredEmployees: SolfaModel[] = props ? props.data : [];
  const [searchterm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-row bg-gray-100">
      <div className="flex justify-center m-10 font-display basis-5/6">
        <div className="flex flex-col justify-center space-y-10">
          <SearchField setSearchTerm={setSearchTerm} />
          <div className="flex flex-row space-x-10"></div>
          {filteredEmployees.map((obj) => (
            <LoansCard
              key={obj.PersonCode}
              name={
                obj.PersonName.PersonFirstName +
                " " +
                obj.PersonName.PersonSecondName +
                " " +
                obj.PersonName.PersonThirdName +
                " " +
                obj.PersonName.PersonFourthName
              }
              code={obj.PersonCode}
              limit={obj.SolfaLimitAtThatMonth}
              LastSolfaDate={obj.LastSolfaRequestDate}
              remainingAmount={obj.LastSolfaValue}
            />
          ))}
        </div>
      </div>
      <SideBar pageName="loan" />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/HR_Endpoints/loan/getLoanHistory`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

export default Loan;
