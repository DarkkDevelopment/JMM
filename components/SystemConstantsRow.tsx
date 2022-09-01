import React from "react";
type Props = {
  title: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SystemConstantsRow = (props: Props) => {
  const { title, value, onChange } = props;
  return (
    <div className="flex flex-row items-baseline justify-between m-2">
      <input
        className="px-4 py-3 text-center border border-gray-300 rounded-lg w-fit focus:outline-blue-500"
        type="text"
        placeholder="ادخل القيمة"
        value={value}
        onChange={onChange}
      />
      <h1>{title}</h1>
    </div>
  );
};
