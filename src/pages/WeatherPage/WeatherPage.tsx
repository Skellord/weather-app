import React, { FC, useEffect } from 'react';
import weatherStore from '../../store/weatherStore';
import {
    StyledCity,
    StyledWeatherPage,
    StyledTemp,
    StyledTempText,
    StyledFeelsText,
} from './weatherPage.styled';
import { trackPromise } from 'react-promise-tracker';
import { observer } from 'mobx-react-lite';
import { Loader } from '../../components/Loader';

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

    return (
        <React.Suspense fallback={<Loader />}>
            <StyledWeatherPage>
                {weatherStore.isLocationLoaded && weatherStore.isWeatherLoaded && (
                    <>
                        <StyledCity>{place}</StyledCity>
                        <StyledTempText>{cloudsCoded}</StyledTempText>
                        <StyledTemp>{currentTemp}°С</StyledTemp>
                        <StyledFeelsText>Ощущается как {feelsLikeTemp}°С</StyledFeelsText>
                    </>
                )}
            </StyledWeatherPage>
        </React.Suspense>
    );
};

export default observer(WeatherPage);
