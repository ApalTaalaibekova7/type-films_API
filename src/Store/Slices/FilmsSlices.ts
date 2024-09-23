import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { filmsAPI } from "../../API"
import { Film, FullFilmData } from "../modules"



type FilmsState = {
    films: Film[],
    loading: boolean
    detail: null | FullFilmData
}
const initialState: FilmsState = {
    films: [], 
    loading: false,
    detail: null,
}

export const getListFilms = createAsyncThunk<Film[], void, {rejectValue: string}> (
    'films/getListFilms', 
    async(_, { rejectWithValue }) => {
        const res = await filmsAPI.getAllFilms()
        console.log(res);

        if(res.status !==200) {
            return rejectWithValue('Server Error')
        }
        return res.data.items
    } 
)

export const getFilmById = createAsyncThunk<FullFilmData, string, {rejectValue: string}> (
    'films/geFilmById', 
    async(id, { rejectWithValue }) => {
        const res = await filmsAPI.getById(id)
        // console.log(res);

        if(res.status !==200) {
            return rejectWithValue('Server Error')
        }
        return res.data
    } 
)


const filmsSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: ({ addCase}) => {

        addCase(getListFilms.pending, (state) => {
            state.loading = true
        })
        addCase(getListFilms.fulfilled, (state, action) => {
            state.loading = false
            state.films = action.payload
        })
        addCase(getFilmById.pending, (state) => {
            state.loading = true
        })
        addCase(getFilmById.fulfilled, (state, action) => {
            state.loading = false
            state.detail = action.payload
        })
    }
})

export default filmsSlice.reducer