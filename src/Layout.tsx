import React from 'react';
import { StyledLayout } from './Layout.styled';
import { Spinner } from './components/Spinner';
import { observer } from 'mobx-react-lite';
import Navigation from './navigation';

const Layout = () => {
    return (
        <React.Suspense fallback={<Spinner />}>
            <StyledLayout>
                <Navigation />
            </StyledLayout>
        </React.Suspense>
    );
};

export default observer(Layout);
