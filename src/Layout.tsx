import React from 'react';
import { StyledLayout } from './Layout.styled';
import { WeatherPage } from './Pages/WeatherPage';
import { Spinner } from './components/Spinner';

export const Layout = () => {
    return (
        <StyledLayout>
            <React.Suspense fallback={<Spinner />}>
                <WeatherPage />
            </React.Suspense>
        </StyledLayout>
    );
};
