import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CitiesResponse, GeoLocationCityResponse } from '../../types/geoPosition.types';
import { observer } from 'mobx-react-lite';
import geoPositionStore from '../../store/geoPositionStore';
import { StyledListItem, StyledAutocompleteContainer } from './CityPage.styled';
import Autocomplete from 'react-native-autocomplete-input';

const CityPage: FC = () => {
    const [value, setValue] = useState<string>('');
    const [allCities, setAllCities] = useState<CitiesResponse>([]);
    const [hideResults, setHideResults] = useState<boolean>(false);

    const onChangeText = async (query: string) => {
        setValue(query);
        hideResults ? setHideResults(false) : void 0;
        const cities = await geoPositionStore.fetchCityQuery(query);
        setAllCities(cities);
    };

    const onPressHandler = (item: GeoLocationCityResponse) => {
        setValue(item.LocalizedName);
        geoPositionStore.setCoordinates(item.GeoPosition.Latitude.toString(), item.GeoPosition.Longitude.toString());
        geoPositionStore.setKeyCode(item.Key);
        setHideResults(true);
    };
    console.log(geoPositionStore.keyCode);
    return (
        <View style={{ position: 'relative' }}>
            <StyledAutocompleteContainer>
                <Autocomplete
                    blurOnSubmit={true}
                    hideResults={hideResults}
                    data={allCities}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setHideResults(false)}
                    flatListProps={{
                        keyboardShouldPersistTaps: 'always',
                        renderItem: ({ item }) => {
                            return (
                                <TouchableOpacity key={item.EnglishName} onPress={() => onPressHandler(item)}>
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
        </View>
    );
};

export default observer(CityPage);
