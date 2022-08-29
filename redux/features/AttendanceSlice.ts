import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { GetAttendanceModel } from "../../models/AttendanceModels";
import AttendanceServices from "../../services/attendanceServices";
import axios from "../../utils/axios";
import { IAttendanceModel } from "../../interfaces/attandance";

export const fetchAttandanceByDate = createAsyncThunk(
  "attendance/fetchAttandanceByDate",
  async (date: Date) => {
    const response = await axios.post("/api/HR_Endpoints/attendance/get", {
      AttendanceDate: date,
    });
    let newAttendance = response.data.map((attendance: IAttendanceModel) => {
      attendance.EnserafTime = attendance.EnserafTime.toString()
        .split("T")[1]
        .slice(0, 5);
      attendance.HodoorTime = attendance.HodoorTime.toString()
        .split("T")[1]
        .slice(0, 5);
      attendance.attended = true;
      return attendance;
    });

    const checkForAttendanceIfOldOrNEW = await axios({
      method: "post",
      url: "/api/HR_Endpoints/attendance/check",
      data: {
        date,
      },
    });

    return {
      date,
      attendance: newAttendance,
      old: checkForAttendanceIfOldOrNEW.data,
    };
  }
);
// Define a type for the slice state
interface AttendanceState {
  employees: IAttendanceModel[];
  old: boolean;
  filterDate: Date;
  workingHoursConstant: number;
  status: "loading" | "succeeded" | "failed";
}

// Define the initial state using that type
const initialState: AttendanceState = {
  employees: [],
  old: false,
  filterDate: new Date(),
  workingHoursConstant: 8,
  status: "loading",
};

export const attendanceSlice = createSlice({
  name: "attendance",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setHedor: (state, action: PayloadAction<IAttendanceModel>) => {
      console.log(action.payload);
      state.employees.push(action.payload);
    },
    setEmployeeHodorTime: (
      state,
      action: PayloadAction<{ index: number; time: string }>
    ) => {
      let employee = state.employees[action.payload.index];
      employee.HodoorTime = action.payload.time;
      employee.TotalNumberOfWorkingHoursAtThatDay = calcualateWorkingHours(
        employee.HodoorTime,
        employee.EnserafTime
      );
      employee.ExtraHours = calculateAdditionalHours(
        state.workingHoursConstant,
        employee.TotalNumberOfWorkingHoursAtThatDay
      );
      employee.LateHours = calculateAbsenceHours(
        state.workingHoursConstant,
        employee.TotalNumberOfWorkingHoursAtThatDay
      );
    },
    setEmplyeeEnsrafTime: (
      state,
      action: PayloadAction<{ index: number; time: string }>
    ) => {
      let employee = state.employees[action.payload.index];
      employee.EnserafTime = action.payload.time;
      employee.TotalNumberOfWorkingHoursAtThatDay = calcualateWorkingHours(
        employee.HodoorTime,
        employee.EnserafTime
      );
      employee.ExtraHours = calculateAdditionalHours(
        state.workingHoursConstant,
        employee.TotalNumberOfWorkingHoursAtThatDay
      );
      employee.LateHours = calculateAbsenceHours(
        state.workingHoursConstant,
        employee.TotalNumberOfWorkingHoursAtThatDay
      );
    },
    setKhasmHourRatio: (
      state,
      action: PayloadAction<{ index: number; value: any }>
    ) => {
      state.employees[action.payload.index].LateFactor = action.payload.value;
    },
    setHafezHourRatio: (
      state,
      action: PayloadAction<{ index: number; value: any }>
    ) => {
      state.employees[action.payload.index].ExtraFactor = action.payload.value;
    },
    ToggleHedor: (
      state,
      action: PayloadAction<{ index: number; attended: boolean }>
    ) => {
      let employees = state.employees.filter(
        (employee, index) => index !== action.payload.index
      );
      state.employees = employees;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAttandanceByDate.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAttandanceByDate.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.employees = action.payload.attendance;
      state.old = action.payload.old;
      state.filterDate = action.payload.date;
    });
    builder.addCase(fetchAttandanceByDate.rejected, (state, action) => {
      state.status = "failed";
    });
  },
});

const calcualateWorkingHours = (
  heddorTime: string,
  enserafTime: string
): number => {
  const fromSplitted = heddorTime.split(":");
  const hedorHour = parseInt(fromSplitted[0]);
  const hedorMinute = parseInt(fromSplitted[1]);

  const toSplitted = enserafTime.split(":");
  const enserafHour = parseInt(toSplitted[0]);
  const enserafMinute = parseInt(toSplitted[1]);

  const totalHours = enserafHour - hedorHour;
  const totalMinutes = enserafMinute - hedorMinute;
  const totalWorkingHours = totalHours + totalMinutes / 60;

  return totalWorkingHours;
};

const calculateAbsenceHours = (
  constHours: number,
  totalWorkingHours: number
): number =>
  totalWorkingHours < constHours ? constHours - totalWorkingHours : 0;
const calculateAdditionalHours = (
  constHours: number,
  totalWorkingHours: number
): number =>
  totalWorkingHours > constHours ? totalWorkingHours - constHours : 0;

export const {
  setHedor,
  setEmployeeHodorTime,
  setEmplyeeEnsrafTime,
  setHafezHourRatio,
  setKhasmHourRatio,
  ToggleHedor,
} = attendanceSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectAttandance = (state: RootState) => state.attendance.employees

export default attendanceSlice.reducer;
