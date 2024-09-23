import React, { FC, useEffect } from 'react';
import Header from '../../components/Header/Header';
import { UseAppDispatch } from '../../hooks';
import { getListFilms } from '../../Store/Slices/FilmsSlices';
import Output from '../../components/Output/Output';

const Home: FC = () => {
    const dispatch = UseAppDispatch()

    useEffect(() => {
        dispatch(getListFilms())

    }, [dispatch])

    return (
        <div>
            <Header />
            <Output />
        </div>
    );
};

export default Home;