import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ConstantsComponent } from '../../components/ConstantsComponent';
import SideBar from '../../components/sideBar';

const Manateq = () => {
    const [manateq, setManateq] = useState<{ id: number, name: string }[]>([]);
    const fetchData = async () => {
        const response = await axios.get('/api/lookupsData/getDataFromLookups/manateq');
        const manateq = response.data.map((manteqa: { ManteqaID: number, ManteqaName: string }) => {
            return { id: manteqa.ManteqaID, name: manteqa.ManteqaName }
        });
        setManateq(manateq);
    }

    const addValue = async (value: string) => {
        
        const response = await axios.post('/api/lookupsData/insertDataIntoLookups/manteqa', { manteqaName: value });
        fetchData();
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newData = manateq.map((item) => {
            if (item.id === id) {
                return { ...item, name: e.target.value };
            }
            return item;
        });
        setManateq(newData);
    }

    const deleteItem = async (id: number) => {
        await axios.post(`/api/lookupsData/deleteDataIntoLookups/manteqa`, {
            id
        });
        fetchData();
    }

    const editItem = async (id: number, name: string) => {
        await axios.post(`/api/lookupsData/updateDataIntoLookups/manteqa`, {
            manteqaId: id,
            manteqaName: name
        });
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <div className="font-display basis-5/6 m-12 mr-80">
                <ConstantsComponent
                    title='المناطق' attributes={manateq}
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

export default Manateq;