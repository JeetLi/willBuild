import { Navigate, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Loader from '';

const GlobalRoute = () => {

    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path='/' element={} />
  
            </Routes>
        </Suspense>
    );
};

export default GlobalRoute;