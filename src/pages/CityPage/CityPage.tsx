import React, { FC, useCallback, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { CitiesResponse, GeoLocationCityResponse } from '../../types/geoPosition.types';
import { observer } from 'mobx-react-lite';
import { StyledListItem, StyledAutocompleteContainer } from './cityPage.styled';
import Autocomplete from 'react-native-autocomplete-input';
import WeatherPage from '../WeatherPage/WeatherPage';
import weatherStore from '../../store/weatherStore';
import { debounce } from 'lodash';

interface GeoPosition {
    latitude: string;
    longitude: string;
    keyCode: string;
}

const CityPage: FC = () => {
    const [value, setValue] = useState<string>('');
    const [allCities, setAllCities] = useState<CitiesResponse>([]);
    const [hideResults, setHideResults] = useState<boolean>(false);
    const [geoPosition, setGeoPosition] = useState<GeoPosition>();

    const fetchQueries = useCallback(
        debounce((query: string) => {
            hideResults ? setHideResults(false) : void 0;
            weatherStore.fetchCityQuery(query).then(data => setAllCities(data));
        }, 1000),
        []
    );

    const onChangeText = (query: string) => {
        setValue(query);
        fetchQueries(query);
    };

    const onPressHandler = (item: GeoLocationCityResponse) => {
        setValue(item.LocalizedName);
        setGeoPosition({
            latitude: item.GeoPosition.Latitude.toString(),
            longitude: item.GeoPosition.Longitude.toString(),
            keyCode: item.Key,
        });
        weatherStore.setKeyCode(item.Key);
        setHideResults(true);
    };
    return (
        <View style={{ position: 'relative' }}>
            <StyledAutocompleteContainer>
                <Autocomplete
                    hideResults={hideResults}
                    data={allCities}
                    value={value}
                    autoFocus={true}
                    onChangeText={onChangeText}
                    onFocus={() => setHideResults(false)}
                    flatListProps={{
                        keyboardShouldPersistTaps: 'always',
                        keyExtractor: ({ _, idx }) => idx?.toString(),
                        // eslint-disable-next-line react/display-name
                        renderItem: ({ item }) => {
                            return (
                                <TouchableOpacity key={item.key} onPress={() => onPressHandler(item)}>
                                    <StyledListItem>
                                        {item.LocalizedName} {item.AdministrativeArea.LocalizedName}{' '}
                                        {item.AdministrativeArea.LocalizedType}
                                    </StyledListItem>
                                </TouchableOpacity>
                            );
                        },
                    }}
                />
            </StyledAutocompleteContainer>
            {geoPosition && (
                <WeatherPage
                    latitude={geoPosition.latitude}
                    longitude={geoPosition.longitude}
                    keyCode={geoPosition.keyCode}
                />
            )}
        </View>
    );
};

export default observer(CityPage);
