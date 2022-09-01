import React from "react";

interface Props {
  title?: string;
  options?: { id: number; name: string }[];
  value?: string;
  isDisabled?: boolean;
  onChange?: CallableFunction;
}

const Dropdown = (props: Props) => {
  const { title, options, value, isDisabled, onChange } = props;
  return (
    <div className="">
      <select
        className="relative flex p-2 text-white bg-blue-900 rounded shadow jutify-center w-fit items-centerbg-white focus:outline-none focus:ring ring-gray-200border group"
        value={value}
        disabled={isDisabled}
        onChange={(e) => onChange!(e.target.value)}
      >
        {options &&
          options!.map((option, index) => {
            return (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Dropdown;
