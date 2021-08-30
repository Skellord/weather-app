import React from 'react';
import { useGeolocation } from 'react-use';
import { Text } from 'react-native';
import locationApi from './api/locationApi';

export const Demo = () => {
    const state = useGeolocation();
    const latitude = state.latitude?.toString() || '';
    const longitude = state.longitude?.toString() || '';
    const getPosition = async () => {
        return await locationApi.getLocationRequest(latitude, longitude);
    };
    const position = getPosition();
    console.log(state, position);

    return <Text>test</Text>;
};
