import axios from "axios";
import React, { useEffect, useState } from "react";
import { ConstantsComponent } from "../../components/ConstantsComponent";
import SideBar from "../../components/sideBar";

const Mohafazat = (props: any) => {
  const [mohafzatArr, setMohafazat] = useState<{ id: number; name: string }[]>(
    []
  );
  const fetchData = async () => {
    const response = await axios.get(
      "/api/lookupsData/getDataFromLookups/mohafazat"
    );
    const agazat = response.data.map(
      (item: { MohafzaID: number; MohafzaName: string }) => {
        return { id: item.MohafzaID, name: item.MohafzaName };
      }
    );
    setMohafazat(agazat);
  };

  const addValue = async (value: string) => {
    const response = await axios.post(
      "/api/lookupsData/insertDataIntoLookups/mohafzat",
      { manteqaName: value }
    );
    fetchData();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newData = mohafzatArr.map((item) => {
      if (item.id === id) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setMohafazat(newData);
  };

  const deleteItem = async (id: number) => {
    await axios.post(`/api/lookupsData/deleteDataIntoLookups/mohafzat`, {
      manteqaId: id,
    });
    fetchData();
  };

  const editItem = async (id: number, name: string) => {
    await axios.post(`/api/lookupsData/updateDataIntoLookups/mohafzat`, {
      manteqaId: id,
      manteqaName: name,
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
          title="المحافظات"
          attributes={mohafzatArr}
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

export default Mohafazat;
