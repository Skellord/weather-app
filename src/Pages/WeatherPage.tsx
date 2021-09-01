import React from 'react';
import { Text } from 'react-native';
import { useRecoilValue } from 'recoil';
import { weatherState } from '../store/weatherStore';
import { StyledCity, StyledWeatherPage } from './WeatherPage.styled';

export const WeatherPage = () => {
    const weatherResponse = useRecoilValue(weatherState);
    console.log(weatherResponse);
    const place = weatherResponse.place.name;
    const currentDay = weatherResponse.periods[0];
    const currentTemp = Math.floor(currentDay.tempC);
    const feelslLikeTemp = Math.floor(currentDay.feelslikeC);

    return (
        <StyledWeatherPage>
            <StyledCity>{place}</StyledCity>
            <Text>На улице {currentTemp}</Text>
            <Text>Ощущается как {feelslLikeTemp}</Text>
        </StyledWeatherPage>
    );
};
