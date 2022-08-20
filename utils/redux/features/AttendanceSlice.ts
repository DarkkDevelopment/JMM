import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { GetAttendanceModel } from '../../../models/AttendanceModels'


// Define a type for the slice state
interface AttendanceState {
    employees: GetAttendanceModel[],
    old: boolean,
    filterDate: Date
    workingHoursConstant: number
}

// Define the initial state using that type
const initialState: AttendanceState = {
    employees: [],
    old: false,
    filterDate: new Date(),
    workingHoursConstant: 8
}

export const attendanceSlice = createSlice({
    name: 'attendance',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setEmployees: (state, action: PayloadAction<GetAttendanceModel[]>) => {
            state.employees = action.payload
        }
    },
})

export const { setEmployees } = attendanceSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAttandance = (state: RootState) => state.attendance.employees

export default attendanceSlice.reducer