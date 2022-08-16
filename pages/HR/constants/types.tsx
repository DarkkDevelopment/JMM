import axios from "axios";
import React, { useEffect, useState } from "react";
import { ConstantsComponent } from "../../../components/ConstantsComponent";
import SideBar from "../../../components/sideBar";

const Types = () => {
    const [types, setTypes] = useState<{ id: number; name: string }[]>([]);
    const fetchData = async () => {
        const response = await axios.get(
            "/api/lookupsData/getDataFromLookups/personTypes"
        );
        console.log(response.data);
        const dyana = response.data.map(
            (item: { PersonTypeID: number; PersonType: string }) => {
                return { id: item.PersonTypeID, name: item.PersonType };
            }
        );
        setTypes(dyana);
    };

    const addValue = async (value: string) => {
        if (value === "") {
            alert("الرجاء ادخال البيانات")
            return;
        }
        const response = await axios.post(
            "/api/lookupsData/insertDataIntoLookups/personTypes",
            {
                personType: value,
            }
        );
        fetchData();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newData = types.map((item) => {
            if (item.id === id) {
                return { ...item, name: e.target.value };
            }
            return item;
        });
        setTypes(newData);
    };

    const deleteItem = async (id: number) => {
        await axios.post(`/api/lookupsData/deleteDataIntoLookups/personTypes`, {
            personTypeId: id,
        });
        fetchData();
    };

    const editItem = async (id: number, name: string) => {
        if (name === "") {
            alert("الرجاء ادخال البيانات بشكل صحيح")
            return;
        }
        await axios.post(`/api/lookupsData/updateDataIntoLookups/personTypes`, {
            personTypeId: id,
            personType: name,
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
                    title="الجنس"
                    attributes={types}
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

export default Types;