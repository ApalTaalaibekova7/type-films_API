import React, { FC } from 'react';
import { useAppSelector } from '../../hooks';
import FilmCard from '../FilmCard/FilmCard';

const Output: FC = () => {
    const {films, loading} = useAppSelector(state => state.films)

    if(loading) {
        return <h1>Loading...</h1>
    }
    return (
        <section> 
            {
                films.length > 0 ?
                films.map(el => <FilmCard key={el.kinopoiskId || el.filmId} {...el}/>)
                :
                <h2>Фильмы не найдены!</h2>
            }
        </section>
    );
};

export default Output;