import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import FilmDetail from '../../Pages/FilmDetail/FilmDetail';

const Main: FC = () => {
    return (
        <main>
            <Routes>
               <Route path='/' element={<Home />}/> 
               <Route path='/detail-film/:name' element={<FilmDetail />}/> 
            </Routes>
        </main>
    );
};

export default Main;