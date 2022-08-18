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
    <div className="flex flex-row justify-around space-x-28 bg-white rounded-lg ml-24">
      
      
        {options.map((option: any) => {
          if (options) {
            return (
              <div key={option.value} className="flex flex-row justify-between">
                <input
                  className="w-full p-2 text-right border justify-between border-gray-300 rounded-lg focus:outline-blue-500"
                  type="radio"
                  name={label}
                  value={option.value}
                  checked={selected == option.value}
                  disabled={editable || false}
                  onClick={(e) => {
                    onChange(option.value);
                  }}
                />
                <label className="p-2 text-lg text-right self-center text-gray-700 -">
                  {option.label}
                </label>
                
              </div>
            );
          }
        })}
    
      <label className="mt-1 text-xl text-right text-gray-700">{label}</label>
    </div>
  );
}

export default RadioButtonComp;
