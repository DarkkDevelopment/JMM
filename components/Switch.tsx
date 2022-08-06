import { useState } from "react";

function Switch(props: any) {
  const type = props.type;
  const old = props.old;
  let check = true;
  if (type != "attendance") {
    check = false;
  }
  const [toggle, setToggle] = useState(type ? true : false);
  const attendToggleClass = "  bg-green-300";
  const leaveToggleClass = "transform translate-x-6 bg-red-300";

  return (
    <div className={`flex flex-row  justify-evenly ${old ? " hidden" : ""}`}>
      <label className="flex items-center justify-center text-center">
        {toggle ? "حاضر" : "غائب"}
      </label>
      <div
        className="flex items-center w-12 h-6 p-1 bg-gray-100 rounded-full shadow-lg cursor-pointer md:w-14 md:h-7"
        onClick={() => {
          props.toggleSwitch(!toggle);
          setToggle(!toggle);
        }}
      >
        {/* Switch */}
        <div
          className={
            " md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
            (toggle ? attendToggleClass : leaveToggleClass)
          }
        ></div>
      </div>
    </div>
  );
}

export default Switch;
