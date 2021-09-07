import React, { useEffect, useState } from 'react';
import weatherStore from '../store/weatherStore';
import {
    StyledCity,
    StyledWeatherPage,
    StyledStatusImage,
    StyledTemp,
    StyledTempText,
    StyledFeelsText,
} from './WeatherPage.styled';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import geoPositionStore from '../store/geoPositionStore';

const WeatherPage = () => {
    const latitude = '53.4304656';
    const longitude = '59.0031243';
    useEffect(() => {
        void trackPromise(geoPositionStore.getCurrentLocation(latitude, longitude));
        void trackPromise(weatherStore.getWeatherCondition(latitude, longitude));
    }, []);
    const place = geoPositionStore.place;
    const currentTemp = weatherStore.currTemp;
    const feelsLikeTemp = weatherStore.feelsLike;
    const cloudsCoded = weatherStore.cloudsCoded;
    console.log(toJS(geoPositionStore));
    let img;
    switch (cloudsCoded) {
        case 'CL':
        case 'FW':
            img = require('../../assets/img/good.png');
            break;
        default:
            img = require('../../assets/img/not-good.png');
    }

    return (
        <StyledWeatherPage>
            {weatherStore.isLoaded && geoPositionStore.isLoaded && (
                <>
                    <StyledCity>{place}</StyledCity>
                    <StyledTempText>
                        На улице <StyledTemp>{currentTemp}°С</StyledTemp>
                    </StyledTempText>
                    <StyledFeelsText>Ощущается как {feelsLikeTemp}°С</StyledFeelsText>
                    <StyledStatusImage source={img} />
                </>
            )}
        </StyledWeatherPage>
    );
};

export default observer(WeatherPage);
