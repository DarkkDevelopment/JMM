import React, { useState } from 'react';
type Props = {
    title: string;
    attributes: { id: number, name: string, date: Date }[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    onDateChange: (e: React.ChangeEvent<HTMLInputElement>, id: number) => void;
    deleteItem: (id: number) => void;
    editItem: (id: number, name: string, date: Date) => void;
    addValue: (value: string, date: Date) => void;
};
export const OfficialAgazaComponent = (props: Props) => {
    const { title, attributes, deleteItem, onChange, addValue, onDateChange } = props;
    const [value, setValue] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    return (
        <div className="flex flex-col justify-end mr-20 mb-6 pr-10 pt-10 pl-10 bg-white shadow-xl space-y-7 rounded-lg">
            <h1 className="text-2xl font-bold text-center justify-center self-center">{title}</h1>
            <div className='flex flex-row flex-1 align-baseline'>
                <div className='flex flex-row justify-start '>
                    <button
                        onClick={() => {
                            addValue(value, date)
                            setValue('')
                        }}
                        className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900">ادخال</button>
                    <input
                        className="w-fit px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500 mr-2"
                        type='date'

                        onChange={(e) => setDate(new Date(e.target.value))}
                        value={date.toISOString().split('T')[0]}
                    />
                    <input
                        className="w-fit px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                        type="text"
                        placeholder="ادخال قيمة جديدة"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    />
                </div>
            </div>
            <table
                className="text-center border-collapse table-auto font-display">
                <thead className="text-center text-white bg-blue-900">
                    <tr>
                        <th className="w-5 p-4 text-center border-b-2">
                        </th>
                        <th className="w-5 p-4 text-center border-b-2">
                        </th>
                        <th className="w-5 p-4 text-center border-b-2">
                            التاريخ
                        </th>
                        <th className="w-5 p-4 text-center border-b-2">الاسم</th>
                        <th className="w-5 p-4 text-center border-b-2"></th>
                    </tr>
                </thead>
                <tbody className="p-10">

                    {
                        attributes.map((attribute, index) => {
                            return (
                                <tr key={attribute.id}>
                                    <td className="p-4 border-b-2">
                                        <button className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
                                            onClick={() => { deleteItem(attribute.id) }}
                                        >حذف</button>
                                    </td>
                                    <td className="p-4 border-b-2">
                                        <button className="m-3 px-4 py-2 text-center shadow appearance-none border rounded-lg w-[10vw]  text-white leading-tight focus:outline-none focus:shadow-outline hover:bg-blue-500 bg-blue-900"
                                            onClick={() => { props.editItem(attribute.id, attribute.name, attribute.date) }}
                                        >تعديل</button>
                                    </td>
                                    <td className="p-4 border-b-2">
                                        <input
                                            className="w-fit px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500 mr-2"
                                            type='date'

                                            onChange={(e) => onDateChange(e, attribute.id)}
                                            value={attribute.date.toISOString().split('T')[0]}
                                        />
                                    </td>
                                    <td className="p-4 border-b-2">
                                        <input
                                            className="w-fit px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                                            type="text" value={attribute.name}
                                            onChange={(e) => onChange(e, attribute.id)}
                                        />
                                    </td>
                                    <td className="p-4 border-b-2"> {index + 1} </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};