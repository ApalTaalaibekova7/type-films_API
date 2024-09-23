import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./Slices/FilmsSlices";

const store = configureStore({
    reducer: {
        films: filmsSlice,
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch