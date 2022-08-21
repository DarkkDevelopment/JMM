import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { VacationsModel } from '../../../models/vacationsModel'




export const fetchGhyabByDate = createAsyncThunk(
    'ghyab/fetchGhyabByDate',
    async (date: Date) => {
        const response = await axios.post('/api/HR_Endpoints/absence/get', {
            date
        })
        const agazarResponse = await axios.post('/api/HR_Endpoints/vacations/getVacationsAtThatDay', {
            date
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
            ghyab: response.data,
            old: checkForAttendanceIfOldOrNEW.data,
            agazat: agazarResponse.data,
        }
    }
)
// Define a type for the slice state
interface AbsenceState {
    employees: [],
    agazat: VacationsModel[],
    old: boolean,
    filterDate: Date
    status: 'loading' | 'succeeded' | 'failed'
}

// Define the initial state using that type
const initialState: AbsenceState = {
    employees: [],
    agazat: [],
    old: false,
    filterDate: new Date(),
    status: 'loading'
}

export const ghyabSlice = createSlice({
    name: 'absence',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setGhyab: (state, action) => {

        }
    },
    extraReducers: builder => {
        builder.addCase(fetchGhyabByDate.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(fetchGhyabByDate.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.employees = action.payload.ghyab;
            state.old = action.payload.old;
            state.filterDate = action.payload.date;
            state.agazat = action.payload.agazat;
        })
        builder.addCase(fetchGhyabByDate.rejected, (state, action) => {
            state.status = 'failed'
        })
    }
})


export const {
    setGhyab
} = ghyabSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectAttandance = (state: RootState) => state.attendance.employees

export default ghyabSlice.reducer