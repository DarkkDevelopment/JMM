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
        className="relative flex items-center justify-center p-3 px-5 text-white bg-blue-900 rounded shadow w-fit focus:outline-none focus:ring ring-gray-200border group"
        value={value}
        disabled={isDisabled}
        onChange={(e) => onChange!(Number(e.target.value))}
      >
        {options &&
          options!.map((option, index) => {
            return (
              <option className="" key={index} value={option.id}>
                {option.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Dropdown;
