import axios from "axios";
import { InferGetServerSidePropsType } from "next";
import React, { useState } from "react";
import Dropdown from "../../../components/DropDown";
import SideBar from "../../../components/sideBar";
import {
  getManateqByMohafzaIdService,
  getMohafzatService,
} from "../../../services/constantsService";

const Manateq = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [value, setValue] = useState("");
  const [manateq, setManateq] = useState<
    { id: number; name: string; mohafzaId: number }[]
  >(props.manateq);
  const governments = props.mohafazat.length > 0 ? props.mohafazat : [];
  const [govs, setGovs] = useState<{ name: string; id: number }[]>(governments);
  const [selectedGov, setSelectedGov] = useState(props.mohafazat[0].id || 0);
  const [matchedGov, onMatchedGovChange] = useState(props.mohafazat[0].id || 0);

  const onGovChange = async (govId: number) => {
    const response = await getManateqByMohafzaIdService(govId);
    setSelectedGov(govId);
    setManateq(response.data);
  };

  const fetchData = async () => {
    const response = await axios.get(
      "/api/lookupsData/getDataFromLookups/manateq"
    );
    const manateq = response.data.map(
      (manteqa: { ManteqaID: number; ManteqaName: string }) => {
        return { id: manteqa.ManteqaID, name: manteqa.ManteqaName };
      }
    );
    setManateq(manateq);
  };

  const addValue = async (value: string) => {
    if (value === "") {
      alert("الرجاء ادخال البيانات");
      return;
    }
    const response = await axios.post(
      "/api/lookupsData/insertDataIntoLookups/manteqa",
      { manteqaName: value, mohafzaId: matchedGov }
    );
    if (matchedGov === selectedGov)
      setManateq([
        ...manateq,
        { id: response.data, name: value, mohafzaId: matchedGov },
      ]);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newData = manateq.map((item) => {
      if (item.id === id) {
        return { ...item, name: e.target.value };
      }
      return item;
    });
    setManateq(newData);
  };

  const onGovChangeHandler = (itemId: number, govId: number) => {
    console.log(itemId, govId);
    const newData = manateq.map((item) => {
      if (item.id === itemId) {
        return { ...item, mohafzaId: govId };
      }
      return item;
    });
    setManateq(newData);
  };

  const deleteItem = async (id: number) => {
    await axios.post(`/api/lookupsData/deleteDataIntoLookups/manteqa`, {
      id,
    });
    fetchData();
  };

  const editItem = async (id: number, name: string, mohafzaId: number) => {
    if (name === "") {
      alert("الرجاء ادخال البيانات بشكل صحيح");
      return;
    }
    await axios.post(
      `/api/lookupsData/updateDataIntoLookups/updateManteqaMohafzaId`,
      {
        manteqaId: id,
        manteqaNewName: name,
        mohafzaId,
      }
    );
    onGovChange(mohafzaId);
  };

  return (
    <div>
      <div className="m-12 font-display basis-5/6 mr-80">
        <div className="flex flex-col justify-end pt-10 pl-10 pr-10 mb-6 mr-20 bg-white rounded-lg shadow-xl space-y-7">
          <div className="self-center justify-center">
            <h1 className="self-center justify-center p-3 text-2xl font-bold text-center">
              المناطق
            </h1>
            <Dropdown
              title="المحافظة"
              options={govs}
              onChange={onGovChange}
              value={selectedGov}
            />
          </div>
          <div className="flex flex-row flex-1 align-baseline">
            <div className="flex flex-row items-baseline justify-start">
              <button
                onClick={() => {
                  addValue(value);
                  setValue("");
                }}
                className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
              >
                ادخال
              </button>
              <div className="mx-4">
                <Dropdown
                  title="المحافظة"
                  options={govs}
                  onChange={onMatchedGovChange}
                  value={matchedGov}
                />
              </div>
              <h1 className="self-center justify-center px-2 text-lg font-bold text-center">
                اختر المحافظة التي تريد ادخال منطقة جديدة لها
              </h1>
              <input
                className="px-4 py-3 text-center border border-gray-300 rounded-lg w-fit focus:outline-blue-500"
                type="text"
                placeholder="ادخال قيمة جديدة"
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </div>
          </div>
          <table className="text-center border-collapse table-auto font-display">
            <thead className="text-center text-white bg-blue-900">
              <tr>
                <th className="w-5 p-4 text-center border-b-2"></th>
                <th className="w-5 p-4 text-center border-b-2"></th>
                <th className="w-5 p-4 text-center border-b-2">المحافظة</th>
                <th className="w-5 p-4 text-center border-b-2">المنطقة</th>
                <th className="w-5 p-4 text-center border-b-2">الاسم</th>
                <th className="w-5 p-4 text-center border-b-2"></th>
              </tr>
            </thead>
            <tbody className="p-10">
              {manateq.map((attribute, index) => {
                return (
                  <tr key={attribute.id}>
                    <td className="p-4 border-b-2">
                      <button
                        className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
                        onClick={() => {
                          deleteItem(attribute.id);
                        }}
                      >
                        حذف
                      </button>
                    </td>
                    <td className="p-4 border-b-2">
                      <button
                        className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
                        onClick={() => {
                          editItem(
                            attribute.id,
                            attribute.name,
                            attribute.mohafzaId
                          );
                        }}
                      >
                        تعديل
                      </button>
                    </td>
                    <td className="p-4 border-b-2">
                      <Dropdown
                        options={govs}
                        value={attribute.mohafzaId}
                        onChange={(govId: any) =>
                          onGovChangeHandler(attribute.id, govId)
                        }
                      />
                    </td>

                    <td className="p-4 border-b-2">
                      <input
                        className="px-4 py-3 text-center border border-gray-300 rounded-lg w-fit focus:outline-blue-500"
                        type="text"
                        value={attribute.name}
                        onChange={(e) => onChange(e, attribute.id)}
                      />
                    </td>
                    <td className="p-4 border-b-2"> {index + 1} </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <SideBar pageName="const" />
    </div>
  );
};
export async function getServerSideProps(context: any) {
  const mohafazatResponse = await getMohafzatService();
  const manateqResponse = await getManateqByMohafzaIdService(
    mohafazatResponse.data[0].id || 0
  );
  return {
    props: {
      manateq: manateqResponse.data ? manateqResponse.data : [],
      mohafazat: mohafazatResponse.data ? mohafazatResponse.data : [],
    },
  };
}

export default Manateq;
