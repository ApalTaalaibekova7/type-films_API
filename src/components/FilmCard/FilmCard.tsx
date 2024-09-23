import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../Store/modules';

// interface FilmCardProps extends Film { } 

const FilmCard: FC<Film> = ({filmId, kinopoiskId, nameRu, nameOriginal, posterUrl }) => {
    return (
        <Link to={`/detail-film/${nameRu || nameOriginal}?filmId=${kinopoiskId || filmId}`}>
            <img width={200} src={posterUrl} alt={`${nameRu? nameRu : nameOriginal}`} />
            <h3>Name: {nameRu ? nameRu : nameOriginal} </h3>
        </Link>
    );
};


export default FilmCard;