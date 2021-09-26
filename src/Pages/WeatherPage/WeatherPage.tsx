import React, { FC, useEffect } from 'react';
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
import geoPositionStore from '../../store/geoPositionStore';
import { Spinner } from '../../components/Spinner';

const WeatherPage: FC = () => {
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
            img = require('../../../assets/img/good.png');
            break;
        default:
            img = require('../../../assets/img/not-good.png');
    }

    return (
        <React.Suspense fallback={<Spinner />}>
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
        </React.Suspense>
    );
};

export default observer(WeatherPage);
