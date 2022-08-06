import React, { useEffect, useState } from "react";

interface Props {
  label?: string;
  isEditable?: boolean;
  condition?: CallableFunction;
  errorMsg?: string;
  defaultValue?: string;
  value?: string;
  onChange?: CallableFunction;
}

function TextField(props: Props) {
  const { label, isEditable, condition, errorMsg, defaultValue, value, onChange } = props;
  const [error, setError] = useState("");

  return (
    <div className="flex pl-40   justify-between p-4 mt-3 space-x-10 text-right bg-white rounded-lg ">
      {error && <div className="text-red-500">{error}</div>}
      <input
        className="w-1/2 px-4 py-3 text-center border border-gray-300 rounded-lg focus:outline-blue-500"
        type="text"
        value={value}
        placeholder={label}
        disabled={isEditable}
        onChange={(e) => {
          if (condition) {
            if (condition(e.target.value)) {
              setError('');
            } else {
              setError(errorMsg!);
            }
          }
          onChange!(e.target.value);
        }}
      />

      <label className="text-lg text-right self-center text-gray-700">{label}</label>


    </div>
  );
}

export default TextField;
