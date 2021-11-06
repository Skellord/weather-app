import React, { FC, useEffect, useState } from 'react';
import weatherStore from '../../store/weatherStore';
import {
    StyledCity,
    StyledWeatherPage,
    StyledStatusImage,
    StyledTemp,
    StyledTempText,
    StyledFeelsText,
} from './WeatherPage.styled';
import { trackPromise } from 'react-promise-tracker';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Spinner } from '../../components/Spinner';
import { Text } from 'react-native';

interface WeatherPage {
    latitude: string;
    longitude: string;
    keyCode: string;
}

const WeatherPage: FC<WeatherPage> = ({ latitude, longitude, keyCode }) => {
    useEffect(() => {
        void trackPromise(weatherStore.getCurrentLocation(latitude, longitude));
        void trackPromise(weatherStore.getWeatherCondition(keyCode));
    }, [longitude, latitude, keyCode]);
    const currentTemp = weatherStore.currTemp;
    const place = weatherStore.place;
    const feelsLikeTemp = weatherStore.feelsLike;
    const cloudsCoded = weatherStore.cloudsCoded;

    let img;
    switch (cloudsCoded) {
        case 'CL':
        case 'FW':
            img = require('../../../assets/img/good.png');
            break;
        default:
            img = require('../../../assets/img/not-good.png');
    }

    return (
        <React.Suspense fallback={<Spinner />}>
            <StyledWeatherPage>
                {weatherStore.isLocationLoaded && weatherStore.isWeatherLoaded && (
                    <>
                        <StyledCity>{place}</StyledCity>
                        <StyledTempText>{cloudsCoded}</StyledTempText>
                        <StyledTemp>{currentTemp}°С</StyledTemp>
                        <StyledFeelsText>Ощущается как {feelsLikeTemp}°С</StyledFeelsText>
                        <StyledStatusImage source={img} />
                    </>
                )}
            </StyledWeatherPage>
        </React.Suspense>
    );
};

export default observer(WeatherPage);
