import React, { useEffect, useState } from "react";

function RadioButtonComp(props: any) {
  const label = props.label;
  const options = props.options;
  const value = props.value;
  const editable = props.editable;
  const selected = props.value;
  const onChange = props.onChange;

  useEffect(() => {
    if (value) {
      onChange(value);
    }
  }, [onChange, props.value, value]);
  return (
    <div className="flex flex-col justify-around p-5 bg-white rounded-lg ">
      <label className="mb-5 text-3xl text-right text-gray-700">{label}</label>
      <div className="flex flex-row justify-around items-center space-x-32 ">
        {options.map((option: any) => {
          if (options) {
            return (
              <div key={option.value} className="flex flex-row justify-end">
                <input
                  className="w-full p-2 text-right border border-gray-300 rounded-lg focus:outline-blue-500"
                  type="radio"
                  name={label}
                  value={option.value}
                  checked={selected == option.value}
                  disabled={editable || false}
                  onClick={(e) => {
                    onChange(option.value);
                  }}
                />
                <label className="p-2 text-right text-gray-700 text-md ">
                  {option.label}
                </label>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default RadioButtonComp;
