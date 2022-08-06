import React, { useState } from "react";
import Switch from "./Switch";
type Props = {
  PersonName: string;
  PersonCode: number;
  from: string;
  to: string;
  attended: boolean;
  hafezHourRatio: number;
  KhasmHourRatio: number;
  old: boolean;
  TotalNumberOfWorkingHoursAtThatDay: number;
  TotalNumberOfAbsenceHoursAtThatDay: number;
  TotalNumberOfExtraHoursAtThatDay: number;
  onFromDateChange: (id: number, date: string) => void;
  onToDateChange: (id: number, date: string) => void;
  onKhasmChange: (id: number, value: any) => void;
  onHafezChange: (id: number, value: any) => void;
  onAttendanceChange: (id: number, attended: boolean) => void;
};
export const HedorRowComponent = (props: Props) => {
  const {
    PersonCode,
    to,
    from,
    PersonName,
    old,
    hafezHourRatio,
    KhasmHourRatio,
    TotalNumberOfWorkingHoursAtThatDay,
    TotalNumberOfAbsenceHoursAtThatDay,
    TotalNumberOfExtraHoursAtThatDay,
    attended,
    onToDateChange,
    onFromDateChange,
    onKhasmChange,
    onHafezChange,
    onAttendanceChange,
  } = props;

  return (
    <tr>
      <td className="p-4 text-center border-b-2">
        <Switch
          old={old}
          type={attended}
          toggleSwitch={(value: boolean) => {
            onAttendanceChange(PersonCode, value);
          }}
        />
      </td>
      <td className="p-4 border-b-2">
        <input
          disabled={old}
          className="w-full p-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
          type="text"
          value={hafezHourRatio}
          onChange={(e) => onHafezChange(PersonCode, e.target.value)}
        />
      </td>
      <td className="p-4 border-b-2">
        <input
          disabled={old}
          className="w-full p-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
          type="text"
          value={KhasmHourRatio}
          onChange={(e) => {
            onKhasmChange(PersonCode, e.target.value);
          }}
        />
      </td>
      <td className="p-4 border-b-2">{TotalNumberOfAbsenceHoursAtThatDay}</td>
      <td className="p-4 border-b-2">{TotalNumberOfExtraHoursAtThatDay}</td>
      <td className="p-4 border-b-2">{TotalNumberOfWorkingHoursAtThatDay}</td>
      <td className="p-4 border-b-2">
        {/*
          // todo : the problem is here that input of type time and value is of type date 
        */}
        <input
          type="time"
          disabled={old}
          className="w-full p-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
          value={to.toString()}
          onChange={(e) => {
            onToDateChange(PersonCode, e.target.value);
          }}
        />
      </td>
      <td className="p-4 border-b-2">
        <input
          type="time"
          disabled={old}
          className="w-full p-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
          value={from.toString()}
          onChange={(e) => {
            onFromDateChange(PersonCode, e.target.value);
          }}
        />
      </td>
      <td className="p-4 border-b-2">{PersonCode}</td>
      <td className="p-4 border-b-2">{PersonName}</td>
    </tr>
  );
};
