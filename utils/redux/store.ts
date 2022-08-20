import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { attendanceSlice } from './features/AttendanceSlice'
import { createWrapper } from "next-redux-wrapper";


export const store = configureStore({
    reducer: {
        attendance: attendanceSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
