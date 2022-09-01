/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

function SearchField(props: any) {
  const setSearchTerm = props.setSearchTerm;

  return (
    <div className="flex flex-row font-display ">
      <input
        className=" focus:border-blue-500 mb-3 px-4 py-2 text-right shadow appearance-none border rounded w-[10vw]  text-black leading-tight focus:outline-none focus:shadow-outline"
        id="search"
        type="text"
        placeholder="بحث"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
        alt="search"
        className="mt-2 ml-3 w-7 h-7"
      />
    </div>
  );
}

export default SearchField;
