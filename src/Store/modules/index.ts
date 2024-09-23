
export type Film = {
    kinopoiskId: number
    nameOriginal: string | null
    nameRu: string | null
    posterUrl: string
}

type CountriesData = { country: string }
type GenresData = { genre: string }

export type FullFilmData = Film & {

    countries: CountriesData []
    description: null | string
    genres: GenresData []
    nameOriginal: null | string
    year: number

    }