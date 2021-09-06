import React from 'react';
import { StyledLayout } from './Layout.styled';
import WeatherPage from './Pages/WeatherPage';
import { Spinner } from './components/Spinner';
import { observer } from 'mobx-react-lite';

const Layout = () => {
    return (
        <StyledLayout>
            <React.Suspense fallback={<Spinner />}>
                <WeatherPage />
            </React.Suspense>
        </StyledLayout>
    );
};

export default observer(Layout);
