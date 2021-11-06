import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types/navigation.types';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Root: {
                screens: {
                    CityTab: {
                        screens: {
                            CityTabScreen: 'City',
                        },
                    },
                    ForecastTab: {
                        screens: {
                            ForecastTabScreen: 'Forecast',
                        },
                    },
                },
            },
        },
    },
};

export default linking;
