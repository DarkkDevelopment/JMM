
import React from 'react';
type Props = {
    title: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SystemConstantsRow = (props: Props) => {
    const { title, value, onChange} = props;
    return (
        <div className='flex flex-row justify-between items-baseline m-2'>
            
            <input
                className="w-fit px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                type="text"
                placeholder="ادخل القيمة"
                value={value}
                onChange={onChange}
            />
            <h1>{title}</h1>
        </div >
    );
};