import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setEmployeeHodorTime, setEmplyeeEnsrafTime, setHafezHourRatio, setKhasmHourRatio, ToggleHedor } from "../utils/redux/features/AttendanceSlice";
import { setGhyab } from "../utils/redux/features/GhyabSlice";
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
  index: number;
};
export const HedorRowComponent = (props: Props) => {
  const dispatch = useDispatch()
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
    index,
  } = props;

  return (
    <tr>
      <td className="p-4 text-center border-b-2">
        <Switch
          old={old}
          type={attended}
          toggleSwitch={(value: boolean) => {
            dispatch(ToggleHedor({ index, attended: value }))
            let slicedPersonName = PersonName.split(' ')
            dispatch(setGhyab({
              employee: {
                PersonCode,
                PersonName: {
                  PersonFirstName: slicedPersonName[0],
                  PersonSecondName: slicedPersonName[1],
                  PersonThirdName: slicedPersonName[2],
                  PersonFourthName: slicedPersonName[3],
                },
                GheyabDayRatio: KhasmHourRatio,
                Date: new Date()
              }
            }))
          }}
        />
      </td>
      <td className="p-4 border-b-2">
        <input
          disabled={old}
          className="w-full py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
          type="text"
          value={hafezHourRatio}
          onChange={(e) => dispatch(setHafezHourRatio({ index, value: e.target.value }))}
        />
      </td>
      <td className="p-4 border-b-2">
        <input
          disabled={old}
          className="w-full py-5 leading-tight text-center text-black border rounded shadow-lg appearance-none focus:outline-none focus:border-blue-500"
          type="text"
          value={KhasmHourRatio}
          onChange={(e) => {
            dispatch(setKhasmHourRatio({ index, value: e.target.value }))
            //onKhasmChange(PersonCode, e.target.value);
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
            //onToDateChange(PersonCode, e.target.value);
            dispatch(setEmplyeeEnsrafTime({ index, time: e.target.value }))
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
            dispatch(setEmployeeHodorTime({ index, time: e.target.value }))
          }}
        />
      </td>
      <td className="p-4 border-b-2">{PersonCode}</td>
      <td className="p-4 border-b-2">{PersonName}</td>
    </tr>
  );
};
