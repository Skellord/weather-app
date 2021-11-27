import React from 'react';
import { StyledLayout } from './Layout.styled';
import { Loader } from './components/Loader';
import { observer } from 'mobx-react-lite';
import Navigation from './navigation';

const Layout = () => {
    return (
        <React.Suspense fallback={<Loader />}>
            <StyledLayout>
                <Navigation />
            </StyledLayout>
        </React.Suspense>
    );
};

export default observer(Layout);
