import React, { FC, useEffect } from 'react';
import weatherStore from '../../store/weatherStore';
import {
    StyledCity,
    StyledWeatherPage,
    StyledStatusImage,
    StyledTemp,
    StyledTempText,
    StyledFeelsText,
} from './weatherPage.styled';
import { trackPromise } from 'react-promise-tracker';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Spinner } from '../../components/Spinner';

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
    console.log(keyCode, weatherStore.keyCode, weatherStore.place);

    return (
        <React.Suspense fallback={<Spinner />}>
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
