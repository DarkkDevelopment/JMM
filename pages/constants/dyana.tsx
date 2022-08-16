import axios from "axios";
import React, { useEffect, useState } from "react";
import { ConstantsComponent } from "../../components/ConstantsComponent";
import SideBar from "../../components/sideBar";

const Dyana = () => {
    const [dyana, setDyana] = useState<{ id: number; name: string }[]>([]);
    const fetchData = async () => {
        const response = await axios.get(
            "/api/lookupsData/getDataFromLookups/personDeyana"
        );
        console.log(response.data);
        const dyana = response.data.map(
            (item: { DyanaID: number; DyanaName: string }) => {
                return { id: item.DyanaID, name: item.DyanaName };
            }
        );
        setDyana(dyana);
    };

    const addValue = async (value: string) => {
        if(value === ""){
            alert("الرجاء ادخال البيانات")
            return;
          }
        const response = await axios.post(
            "/api/lookupsData/insertDataIntoLookups/deyanaLookup",
            { nameOfNewDeyana: value }
        );
        fetchData();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newData = dyana.map((item) => {
            if (item.id === id) {
                return { ...item, name: e.target.value };
            }
            return item;
        });
        setDyana(newData);
    };

    const deleteItem = async (id: number) => {
        await axios.post(`/api/lookupsData/deleteDataIntoLookups/deyanaLookup`, {
            id,
        });
        fetchData();
    };

    const editItem = async (id: number, name: string) => {
        if(name === "" ){
            alert("الرجاء ادخال البيانات بشكل صحيح")
            return;
        }
        await axios.post(`/api/lookupsData/updateDataIntoLookups/deyanaLookup`, {
            idOfNewDeyana: id,
            nameOfNewDeyana: name,
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
                    title="الديانات"
                    attributes={dyana}
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

export default Dyana;