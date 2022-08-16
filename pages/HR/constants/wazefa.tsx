import axios from "axios";
import React, { useEffect, useState } from "react";
import { ConstantsComponent } from "../../../components/ConstantsComponent";
import SideBar from "../../../components/sideBar";

const Wazayf = () => {
    const [wazefa, setWazefa] = useState<{ id: number; name: string }[]>([]);
    const fetchData = async () => {
        const response = await axios.get(
            "/api/lookupsData/getDataFromLookups/wazayef"
        );
        console.log(response.data);
        const dyana = response.data.map(
            (item: { WazeefaID: number; WazeefaName: string }) => {
                return { id: item.WazeefaID, name: item.WazeefaName };
            }
        );
        setWazefa(dyana);
    };

    const addValue = async (value: string) => {
        if (value === "") {
            alert("الرجاء ادخال البيانات")
            return;
        }
        const response = await axios.post(
            "/api/lookupsData/insertDataIntoLookups/wazayefLookup",
            {
                wazeefaName: value,
                wazeefaDescription: ''
            }
        );
        fetchData();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newData = wazefa.map((item) => {
            if (item.id === id) {
                return { ...item, name: e.target.value };
            }
            return item;
        });
        setWazefa(newData);
    };

    const deleteItem = async (id: number) => {
        await axios.post(`/api/lookupsData/deleteDataIntoLookups/wazayefLookup`, {
            wazeefaId: id,
        });
        fetchData();
    };

    const editItem = async (id: number, name: string) => {
        if (name === "") {
            alert("الرجاء ادخال البيانات بشكل صحيح")
            return;
        }
        await axios.post(`/api/lookupsData/updateDataIntoLookups/wazayefLookup`, {
            wazeefaId: id,
            wazeefaName: name,
            wazeefaDescription: ''
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
                    title="الوظائف"
                    attributes={wazefa}
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

export default Wazayf;