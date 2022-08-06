import axios from "axios";
import React, { useEffect, useState } from "react";
import { ConstantsComponent } from "../../components/ConstantsComponent";
import SideBar from "../../components/sideBar";

const HwafezReasons = () => {
  const [hwafez, setHwafez] = useState<{ id: number; name: string }[]>([]);
  const fetchData = async () => {
    const response = await axios.get(
      "/api/lookupsData/getDataFromLookups/getHawafezReasons"
    );
    console.log(response.data);
    const agazat = response.data.map(
      (item: { ReasonID: number; ReasonDescription: string }) => {
        return { id: item.ReasonID, name: item.ReasonDescription };
      }
    );
    setHwafez(agazat);
  };

  const addValue = async (value: string) => {
    const response = await axios.post(
      "/api/lookupsData/insertDataIntoLookups/hafezReasons",
      { reasonDescription: value }
    );
    fetchData();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newData = hwafez.map((item) => {
      if (item.id === id) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setHwafez(newData);
  };

  const deleteItem = async (id: number) => {
    await axios.post(`/api/lookupsData/deleteDataIntoLookups/hafezReasons`, {
      reasonID: id,
    });
    fetchData();
  };

  const editItem = async (id: number, name: string) => {
    await axios.post(`/api/lookupsData/updateDataIntoLookups/hafezReasons`, {
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
          title="اسباب الحوافز"
          attributes={hwafez}
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

export default HwafezReasons;
