import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UseAppDispatch, useAppSelector } from '../../hooks';
import { getFilmById, getFilmVideos } from '../../Store/Slices/FilmsSlices';

const FilmDetail: FC = () => {
    const  [searchParams] = useSearchParams();
    const  [query] = useState(searchParams.get('filmId'))
    const dispatch = UseAppDispatch()
    const {loading, detail, videos } = useAppSelector(state => state.films)

    // console.log(detail) 
    
    useEffect (() => {
        if(query) {
            dispatch(getFilmById(`${query}`));
            dispatch(getFilmVideos(query)); // Запрашиваем видео по ID фильма
        }
    }, [query, dispatch])

    if ( loading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            {
                detail && 
                <>
                    <img width={200} src={detail.posterUrl} alt={`${detail.nameRu ? detail.nameRu : detail.nameOriginal}`} />
                    <h2>{detail.nameRu ? detail.nameRu : detail.nameOriginal}</h2>
                    <p>{detail.description ? detail.description : 'Описания нет!'}</p>
                    <p>Год {detail.year}</p>
                    <ul>
                          { 
                        detail.countries.map((el, i) => <li key={i}> {el.country}</li>)
                    }
                    </ul>
                      <ol>
                          { 
                        detail.genres.map((el, i) => <li key={i}> {el.genre}</li>)
                    }
                    </ol>

                     {/* Отображение видео */}
                     <h3>Видео:</h3>
                    <ul>
                        {videos &&  videos.length > 0 ? (
                        videos.map((video: any, i: number) => (
                            <li key={i}>
                                <a href={video.url} target="_blank" rel="noopener noreferrer">
                                    {video.name}
                                </a>
                            </li>
                        ))
                    ) : (
                        <p>Видео отсутствует!</p> 
                    )}
                    </ul>
                </>
            }
        </div>
    );
}; 

export default FilmDetail;