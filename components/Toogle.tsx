
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import { Icon } from '@iconify/react';
import React, { useState } from "react";


 

  const ToggleButtons = (props: any) => {
    const pageName = props.pageName;
    const [selected, setSelected] = React.useState(false);
    const [alignment, setAlignment] = React.useState<string | null>('left');
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
      ) => {
        setAlignment(newAlignment);
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
>


   
<Icon icon="cil:x" width={20} height={20}/>


</ToggleButton>


    </ToggleButtonGroup>
  );
}
export default ToggleButtons;


function setSelected(arg0: boolean) {
    throw new Error('Function not implemented.');
}

