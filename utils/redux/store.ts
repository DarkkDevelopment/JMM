import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { attendanceSlice } from './features/AttendanceSlice'
import { ghyabSlice } from './features/GhyabSlice'
//import { createWrapper } from "next-redux-wrapper";


export const store = configureStore({
    reducer: {
        [attendanceSlice.name]: attendanceSlice.reducer,
        [ghyabSlice.name]: ghyabSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
})


setupListeners(store.dispatch)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
