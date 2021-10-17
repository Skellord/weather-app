import React, { FC, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CitiesResponse, GeoLocationCityResponse } from '../../types/geoPosition.types';
import { observer } from 'mobx-react-lite';
import geoPositionStore from '../../store/geoPositionStore';
import { StyledList, StyledListItem, StyledInput, StyledAutocompleteContainer } from './CityPage.styled';
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
                    onBlur={() => setHideResults(true)}
                    flatListProps={{
                        keyboardShouldPersistTaps: 'always',
                        renderItem: ({ item }) => {
                            console.log(item);
                            return (
                                <TouchableOpacity
                                    onPress={() => [
                                        setValue(item.AdministrativeArea.LocalizedName),
                                        setHideResults(true),
                                    ]}
                                >
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
