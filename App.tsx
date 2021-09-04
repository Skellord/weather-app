import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import { Layout } from './src/Layout';

export default function App() {
    return (
        <RecoilRoot>
            <Layout />
            <StatusBar style='auto' />
        </RecoilRoot>
    );
}
