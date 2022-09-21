import axios from "axios";
import { InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import { ConstantsComponent } from "../../components/ConstantsComponent";

import TSB from "../../components/TSB";

const AddInventory = () => {
  //fetchData();

  return (
    <div>
      <div className="m-12 font-display basis-5/6 mr-80">
        <ConstantsComponent
          title="اضافه مخزن"
          attributes={[]}
          onChange={function (
            e: React.ChangeEvent<HTMLInputElement>,
            id: number
          ): void {
            throw new Error("Function not implemented.");
          }}
          deleteItem={function (id: number): void {
            throw new Error("Function not implemented.");
          }}
          editItem={function (id: number, name: string): void {
            throw new Error("Function not implemented.");
          }}
          addValue={function (value: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
      <TSB pageName="AddInventory" />
    </div>
  );
};

export default AddInventory;
