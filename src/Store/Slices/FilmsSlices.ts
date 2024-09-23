import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { filmsAPI } from "../../API"
import { Film, FullFilmData } from "../modules"

// Тип состояния для фильмов
type FilmsState = {
    films: Film[],
    loading: boolean
    detail: null | FullFilmData,
    videos: any[] // Массив для хранения видео (тизеров, трейлеров) 
}
// Начальное состояние
const initialState: FilmsState = {
    films: [], 
    loading: false,
    detail: null,
    videos: [] // Инициализируем пустым массивом
}



export const getListFilms = createAsyncThunk<Film[], void, {rejectValue: string}> (
    'films/getListFilms', 
    async(_, { rejectWithValue }) => {
        const res = await filmsAPI.getAllFilms()
        // console.log(res);

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

export const getFilmByKeyword = createAsyncThunk<Film[], string, {rejectValue: string}> (
    'films/getFilmByKeyword', 
    async(keyword, { rejectWithValue }) => {
        const res = await filmsAPI.getByKeyword(keyword)
        // console.log(res);

        if(res.status !==200) {
            return rejectWithValue('Server Error')
        }
        return res.data.films
    } 
)

// Пример асинхронного запроса для получения источников просмотра фильма
export const  getFilmVideos = createAsyncThunk<any[], string,{rejectValue: string} >(
    'films/ getFilmVideos',
    async (filmId, { rejectWithValue }) => {
        try {
            const response = await filmsAPI.getVideosByFilmId(filmId); // API вызов для получения источников
            return response.data.items
        } catch (error) {
            return rejectWithValue('Ошибка при получении видео');
        }
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
        addCase(getFilmByKeyword.pending, (state) => {
            state.loading = true
        })
        addCase(getFilmByKeyword.fulfilled, (state, action) => {
            state.loading = false
            state.films = action.payload
        }) 
        .addCase(getFilmVideos.pending, (state) => {
            state.loading = true;
        })
        .addCase(getFilmVideos.fulfilled, (state, action) => {
            state.loading = false;
            state.videos = action.payload; // Сохраняем видео в состоянии
        })
        .addCase(getFilmVideos.rejected, (state) => {
            state.loading = false;
        });
        
    }
})

export default filmsSlice.reducer