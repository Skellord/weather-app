import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyledView, StyledText } from './App.styled';
import { Demo } from './src';

export default function App() {
    return (
        <StyledView>
            <Demo />
            <StatusBar style='auto' />
        </StyledView>
    );
}
