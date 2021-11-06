import React, { FC, useEffect } from 'react';
import { StyledForecast, StyledList, StyledListItem } from './ForecastPage.styled';
import { Text } from 'react-native';
import { trackPromise } from 'react-promise-tracker';
import weatherStore from '../../store/weatherStore';
import { observer } from 'mobx-react-lite';
import { Forecast } from '../../types/condition.types';
import { parseISO, format } from 'date-fns';

export const DATE_MONTH_FORMAT = 'dd.MM eeee';

const ForecastPage: FC = () => {
    useEffect(() => {
        void trackPromise(weatherStore.getWeatherForecast(weatherStore.keyCode));
    }, []);
    // @ts-ignore
    const renderItem = ({ item }) => {
        const forecast = item as Forecast;
        const date = format(parseISO(forecast.Date), DATE_MONTH_FORMAT);
        console.log(date);
        return (
            <StyledListItem>
                <Text>{date}</Text>
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
