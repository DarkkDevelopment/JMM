import axios from "axios";
import React, { useEffect, useState } from "react";
import { OfficialAgazaComponent } from "../../components/OfficialAgazaComponent";
import SideBar from "../../components/sideBar";

const OfficialAgaza = () => {
    const [types, setTypes] = useState<{ id: number; name: string, date: Date }[]>([]);
    const fetchData = async () => {
        const response = await axios.get(
            "/api/lookupsData/getDataFromLookups/agazatRasmeya"
        );
        console.log(response.data);
        const dyana = response.data.map(
            (item: { AgazaRasmyaID: number; AgazaRasmyaName: string, AgazaRasmyaDate: string }) => {
                return { id: item.AgazaRasmyaID, name: item.AgazaRasmyaName, date: new Date(item.AgazaRasmyaDate) };
            }
        );
        setTypes(dyana);
    };

    const addValue = async (value: string, date: Date) => {
        console.log(date)
        console.log(value)
        const response = await axios.post(
            "/api/lookupsData/insertDataIntoLookups/agazatRasmeya",
            {
                nameOfNewAgaza: value,
                dateOfNewAgaza: date
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

    const onDateChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        let newDate = new Date(e.target.value)
        const newData = types.map((item) => {
            if (item.id === id) {
                return { ...item, date: newDate };
            }
            return item;
        }
        );
        setTypes(newData);
    }

    const deleteItem = async (id: number) => {
        await axios.post(`/api/lookupsData/deleteDataIntoLookups/agazatRasmeya`, {
            id,
        });
        fetchData();
    };

    const editItem = async (id: number, name: string, date: Date) => {
        await axios.post(`/api/lookupsData/updateDataIntoLookups/agazatRasmeya`, {
            idOfNewAgaza: id,
            nameOfNewAgaza: name,
            dateOfNewAgaza: date
        });
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <div className="m-12 font-display basis-5/6 mr-80">
                <OfficialAgazaComponent
                    title="الاجازات الرسمية"
                    attributes={types}
                    deleteItem={deleteItem}
                    editItem={editItem}
                    onChange={onChange}
                    onDateChange={onDateChange}
                    addValue={addValue}
                />
            </div>
            <SideBar pageName="const" />
        </div>
    );
};

export default OfficialAgaza;