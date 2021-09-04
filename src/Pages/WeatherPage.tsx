import React from 'react';
import { Text, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import { weatherState } from '../store/weatherStore';
import {
    StyledCity,
    StyledWeatherPage,
    StyledStatusImage,
    StyledTemp,
    StyledTempText,
    StyledFeelsText,
} from './WeatherPage.styled';

export const WeatherPage = () => {
    const weatherResponse = useRecoilValue(weatherState);
    console.log(weatherResponse);
    const place = weatherResponse.place.name;
    const currentDay = weatherResponse.periods[0];
    const currentTemp = Math.floor(currentDay.tempC);
    const feelslLikeTemp = Math.floor(currentDay.feelslikeC);
    let img;
    switch (currentDay.cloudsCoded) {
        case 'CL':
        case 'FW':
            img = require('../../assets/img/good.png');
            break;
        default:
            img = require('../../assets/img/not-good.png');
    }

    return (
        <StyledWeatherPage>
            <StyledCity>{place}</StyledCity>
            <StyledTempText>
                На улице <StyledTemp>{currentTemp}°С</StyledTemp>
            </StyledTempText>
            <StyledFeelsText>Ощущается как {feelslLikeTemp}°С</StyledFeelsText>
            <StyledStatusImage source={img} />
        </StyledWeatherPage>
    );
};
