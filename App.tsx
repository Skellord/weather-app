import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyledView, StyledText } from './App.styled';

export default function App() {
    return (
        <StyledView>
            <StyledText>Test</StyledText>
            <StatusBar style='auto' />
        </StyledView>
    );
}
