import axios from "axios";
import React, { useEffect, useState } from "react";
import { ConstantsComponent } from "../../components/ConstantsComponent";
import SideBar from "../../components/sideBar";

const Agazat = () => {
  const [agazat, setagazat] = useState<{ id: number; name: string }[]>([]);
  const fetchData = async () => {
    const response = await axios.get(
      "/api/lookupsData/getDataFromLookups/agazaTypes"
    );
    const agazat = response.data.map(
      (manteqa: { AgazaTypeID: number; AgazaType: string }) => {
        return { id: manteqa.AgazaTypeID, name: manteqa.AgazaType };
      }
    );
    setagazat(agazat);
  };

  const addValue = async (value: string) => {
    if (value === "") {
      alert("الرجاء ادخال البيانات")
      return;
    }
    const response = await axios.post(
      "/api/lookupsData/insertDataIntoLookups/agazaTypes",
      { nameOfNewAgaza: value }
    );
    fetchData();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newData = agazat.map((item) => {
      if (item.id === id) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setagazat(newData);
  };

  const deleteItem = async (id: number) => {
    await axios.post(`/api/lookupsData/deleteDataIntoLookups/agazaTypes`, {
      AgazaTypeID: id,
    });
    fetchData();
  };

  const editItem = async (id: number, name: string) => {
    if (name === "") {
      alert("الرجاء ادخال البيانات")
      return;
    }
    await axios.post(`/api/lookupsData/updateDataIntoLookups/agazaTypes`, {
      idOfNewAgaza: id,
      nameOfNewAgaza: name,
    });
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="m-12 font-display basis-5/6 mr-80">
        <ConstantsComponent
          title="انواع الاجازات"
          attributes={agazat}
          deleteItem={deleteItem}
          editItem={editItem}
          onChange={onChange}
          addValue={addValue}
        />
      </div>
      <SideBar pageName="const" />
    </div>
  );
};

export default Agazat;
