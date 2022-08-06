import React from "react";

interface Props {
    label: string;
    isEditable?: boolean;
    placeholders: string[];
    defaultValues?: string[];
    values?: string[]
    onChange?: any;
}

function CustomizableTextField(props: Props) {
    const { label, placeholders, isEditable, values, onChange } = props;
    return (
        <div className="flex flex-row justify-around  p-4 pr-0 mt-3 space-x-10 text-right bg-white rounded-lg  ">
            <div className="flex flex-row space-x-2 mr-5">
                {
                    placeholders.map((placeholder, index) => {
                        return (<input
                            key={index}
                            className="w-full p-2 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
                            type="text"
                            value={values ? values[index] : ""}
                            placeholder={placeholder}
                            disabled={isEditable}
                            onChange={e => onChange![index](e.target.value)}
                        />);
                    })
                }

                <label className="text-lg text-right self-center pl-10 mr-0 text-gray-700">{label}</label>
            </div>
        </div>
    );
}

export default CustomizableTextField;
