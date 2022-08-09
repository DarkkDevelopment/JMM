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
        className="relative flex jutify-center w-fit items-centerbg-white bg-blue-900 text-white rounded focus:outline-none focus:ring ring-gray-200border shadow group p-2"
        value={value}
        disabled={isDisabled}
        onChange={(e) => onChange!(e.target.value)}

      >
        {options &&
          options!.map((option, index) => {
            return (
              <option key={index} value={option.name}>{option.name}</option>
            );
          })}
      </select>
    </div>
  );
};

export default Dropdown;
