import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import { WeatherPage } from './src/Pages/WeatherPage';
import { Spinner } from './src/components/Spinner';
import { View } from 'react-native';

export default function App() {
    return (
        <RecoilRoot>
            <React.Suspense fallback={<Spinner />}>
                <WeatherPage />
            </React.Suspense>
            <StatusBar style='auto' />
        </RecoilRoot>
    );
}
