import React, { FC, useEffect } from 'react';
import {
    StyledForecast,
    StyledList,
    StyledListItem,
    StyledWeatherWrapper,
    StyledWeatherText,
} from './ForecastPage.styled';
import { Text, View } from 'react-native';
import { trackPromise } from 'react-promise-tracker';
import weatherStore from '../../store/weatherStore';
import { observer } from 'mobx-react-lite';
import { Forecast } from '../../types/condition.types';
import { parseISO, format } from 'date-fns';
import { ru } from 'date-fns/locale';

const DATE_MONTH_FORMAT = 'dd.MM';
const DATE_WEEK_FORMAT = 'eeee';

const ForecastPage: FC = () => {
    useEffect(() => {
        void trackPromise(weatherStore.getWeatherForecast(weatherStore.keyCode));
    }, []);
    // @ts-ignore
    const renderItem = ({ item }) => {
        const forecast = item as Forecast;
        const date = format(parseISO(forecast.Date), DATE_MONTH_FORMAT);
        const week = format(parseISO(forecast.Date), DATE_WEEK_FORMAT, { locale: ru });
        console.log(date);
        return (
            <StyledListItem>
                <View>
                    <Text>{week.charAt(0).toUpperCase() + week.slice(1)}</Text>
                    <Text>{date}</Text>
                </View>
                <StyledWeatherWrapper>
                    <StyledWeatherText>{forecast.Day.IconPhrase}</StyledWeatherText>
                    <Text>
                        {Math.floor((forecast.Temperature.Minimum.Value + forecast.Temperature.Maximum.Value) / 2)}°С
                    </Text>
                </StyledWeatherWrapper>
            </StyledListItem>
        );
    };
    return (
        <StyledForecast>
            {weatherStore.isForecastLoaded ? (
                <StyledList
                    keyExtractor={(_, idx) => idx.toString()}
                    data={weatherStore.forecast.DailyForecasts}
                    renderItem={renderItem}
                />
            ) : (
                <>
                    <StyledListItem>
                        <Text>22.11</Text>
                    </StyledListItem>
                    <StyledListItem>
                        <Text>22.11</Text>
                    </StyledListItem>
                    <StyledListItem>
                        <Text>22.11</Text>
                    </StyledListItem>
                    <StyledListItem>
                        <Text>22.11</Text>
                    </StyledListItem>
                    <StyledListItem>
                        <Text>22.11</Text>
                    </StyledListItem>
                </>
            )}
        </StyledForecast>
    );
};

export default observer(ForecastPage);
