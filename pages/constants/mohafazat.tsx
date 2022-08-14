import axios from "axios";
import { InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import { ConstantsComponent } from "../../components/ConstantsComponent";
import SideBar from "../../components/sideBar";
import { getMohafzatService } from "../../services/constantsService";

const Mohafazat = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [mohafzatArr, setMohafazat] = useState<{ id: number; name: string }[]>(
    props.data
  );

  const addValue = async (value: string) => {
    const response = await axios.post(
      "/api/lookupsData/insertDataIntoLookups/mohafzat",
      { manteqaName: value }
    );
    let newData = [...mohafzatArr];
    newData.push({ id: response.data.MohafzaID, name: value });
    setMohafazat(newData);
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
    let newData = mohafzatArr.filter((item) => item.id !== id);
    setMohafazat(newData);
  };

  const editItem = async (id: number, name: string) => {
    await axios.post(`/api/lookupsData/updateDataIntoLookups/mohafzat`, {
      manteqaId: id,
      manteqaName: name,
    });

    let newData = mohafzatArr.map((item) => {
      if (item.id === id) {
        return { ...item, name: name };
      }
      return item;
    });
    setMohafazat(newData);
    //fetchData();
  };

  /* useEffect(() => {
    fetchData();
  }, []); */
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


export async function getServerSideProps(context: any) {
  let response = await getMohafzatService();

  return {
    props: response,
  };
}
export default Mohafazat;
