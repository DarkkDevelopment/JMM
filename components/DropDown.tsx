import React from "react";

interface Props {
  title?: string;
  options?: { id: number; name: string }[];
  value?: number;
  isDisabled?: boolean;
  onChange?: CallableFunction;
}

const Dropdown = (props: Props) => {
  const { title, options, value, isDisabled, onChange } = props;
  return (
    <div className="">
      <select
        className="relative flex justify-center w-fit items-center bg-blue-900 text-white rounded focus:outline-none focus:ring ring-gray-200border shadow group p-3"
        value={value}
        disabled={isDisabled}
        onChange={(e) => onChange!(Number(e.target.value))}

      >
        {options &&
          options!.map((option, index) => {
            return (
              <option className = "" key={index} value={option.id}>{option.name}</option>
            );
          })}
      </select>
    </div>
  );
};

export default Dropdown;
