import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Layout from './src/Layout';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <Layout />
            <StatusBar style='auto' />
        </SafeAreaProvider>
    );
}
