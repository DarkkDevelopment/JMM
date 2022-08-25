import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userDataState } from "../../@types/userDataState";

const initialState: userDataState = {
  personCode: 0,
  personJob: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setPersonCode(state, action: PayloadAction<number>) {
      state.personCode = action.payload;
    },
    setPersonJob(state, action: PayloadAction<string>) {
      state.personJob = action.payload;
    },
  },
});

export const { setPersonCode, setPersonJob } = userSlice.actions;

export default userSlice.reducer;
