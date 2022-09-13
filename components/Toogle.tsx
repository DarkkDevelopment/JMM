import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckIcon from "@mui/icons-material/Check";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { border } from "@mui/system";

const ToggleButtons = (props: any) => {
  const pageName = props.pageName;
  const [selected, setSelected] = React.useState(false);
  const [alignment, setAlignment] = React.useState<string | null>("left");
  const [hovering, setHovering] = React.useState(false);
  const [hoveringTrue, setHoveringTrue] = React.useState(false);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const handleMouseTrueEnter = () => {
    setHoveringTrue(true);
  };

  const handleMouseTrueLeave = () => {
    setHoveringTrue(false);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        style={{
          border: "1px solid grey",

          backgroundColor: hoveringTrue
            ? "green"
            : "rgb(243 244 246 / var(--tw-bg-opacity))",
          color: hoveringTrue ? "white" : "black",
        }}
        onMouseEnter={handleMouseTrueEnter}
        onMouseLeave={handleMouseTrueLeave}
      >
        <CheckIcon />
      </ToggleButton>

      <div
        className={`"cursor-pointer hover:text-red-600 
            ${
              pageName === "employees"
                ? "text-red-600 text-2xl"
                : "text-blue-900 text-2xl"
            }`}
      >
        <ToggleButton value="center" aria-label="centered" disabled>
          choose
        </ToggleButton>
      </div>

      <ToggleButton
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        style={{
          border: "1px solid grey",
          backgroundColor: hovering
            ? "red"
            : "rgb(243 244 246 / var(--tw-bg-opacity))",
          color: hovering ? "white" : "black",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Icon icon="cil:x" width={20} height={20} />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
export default ToggleButtons;

function setSelected(arg0: boolean) {
  throw new Error("Function not implemented.");
}
