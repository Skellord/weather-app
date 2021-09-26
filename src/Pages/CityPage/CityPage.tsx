import React, { FC, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StyledAutocompleteContainer } from './CityPage.styled';
import Autocomplete from 'react-native-autocomplete-input';
import { CitiesResponse, GeoLocationCityResponse } from '../../types/geoPosition.types';
import { observer } from 'mobx-react-lite';
import geoPositionStore from '../../store/geoPositionStore';

const CityPage: FC = () => {
    const [query, setQuery] = useState<string>('');
    const [allCities, setAllCities] = useState<CitiesResponse | null>(null);
    const isLoading = !allCities?.length;
    const data: string[] = (allCities?.length === 1 && allCities.map(item => item.LocalizedName)) || [];
    const placeholder = isLoading ? 'Загрузка данных' : 'Введите название города';
    useEffect(() => {
        let cities: any;
        const fetchQuery = async () => {
            cities = await geoPositionStore.fetchCityQuery(query);
            return;
        };
        if (query?.length > 0) {
            fetchQuery().then(() => setAllCities(cities));
        }
    }, [query]);
    console.log(allCities, 'allcities', data);
    return (
        <View>
            <StyledAutocompleteContainer>
                <Autocomplete
                    data={data}
                    editable={isLoading}
                    autoCorrect={false}
                    value={query}
                    onChangeText={setQuery}
                    placeholder={placeholder}
                    flatListProps={{
                        keyboardShouldPersistTaps: 'always',
                        keyExtractor: (city: GeoLocationCityResponse) => city.Key,
                        renderItem: ({ item }) => (
                            <TouchableOpacity onPress={() => setQuery(item.LocalizedName)}>
                                <Text>{item.LocalizedName}</Text>
                            </TouchableOpacity>
                        ),
                    }}
                />
            </StyledAutocompleteContainer>
            <Text>City</Text>
        </View>
    );
};

export default observer(CityPage);
