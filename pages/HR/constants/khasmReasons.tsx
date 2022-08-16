import axios from "axios";
import React, { useEffect, useState } from "react";
import { ConstantsComponent } from "../../../components/ConstantsComponent";
import SideBar from "../../../components/sideBar";

// @ts-ignore
const KhasmReasons = (props) => {
  const [khasm, setKhasm] = useState<{ id: number; name: string }[]>([]);
  const fetchData = async () => {
    const response = await axios.get(
      "/api/lookupsData/getDataFromLookups/getKhsomatReasons"
    );
    const agazat = response.data.map(
      (item: { ReasonID: number; ReasonDescription: string }) => {
        return { id: item.ReasonID, name: item.ReasonDescription };
      }
    );
    setKhasm(agazat);
  };

  const addValue = async (value: string) => {
    if(value === ""){
      alert("الرجاء ادخال البيانات")
      return;
    }
    const response = await axios.post(
      "/api/lookupsData/insertDataIntoLookups/khasmReasons",
      { reasonDescription: value }
    );
    fetchData();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newData = khasm.map((item) => {
      if (item.id === id) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setKhasm(newData);
  };

  const deleteItem = async (id: number) => {
    await axios.post(`/api/lookupsData/deleteDataIntoLookups/khasmReasons`, {
      reasonID: id,
    });
    fetchData();
  };

  const editItem = async (id: number, name: string) => {
    if (name === "") {
      alert("الرجاء ادخال البيانات بشكل صحيح")
      return;
    }
    await axios.post(`/api/lookupsData/updateDataIntoLookups/khasmReasons`, {
      reasonID: id,
      reasonDescription: name,
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
          title="اسباب الخصم"
          attributes={khasm}
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

export default KhasmReasons;
