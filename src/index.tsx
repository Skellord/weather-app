import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { weatherState } from './store/weatherStore';

export const Demo = () => {
    const weather = useRecoilValue(weatherState);
    console.log(weather);

    return (
        <Text>
            {/*Weather in {data?.response[0].place.name} is {data?.response[0].periods[0].tempC} C. Feels like{' '}*/}
            {/*{data?.response[0].periods[0].feelslikeC}*/}
            test
        </Text>
    );
};
