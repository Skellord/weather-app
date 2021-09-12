import React, { FC } from 'react';
import { StyledNavBar, StyledLink } from './NavBar.styled';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList, RootTabScreenProps } from '../../types/navigation.types';
import CityPage from '../../Pages/CityPage/CityPage';
import WeatherPage from '../../Pages/WeatherPage/WeatherPage';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const NavBar: FC = () => {
    return (
        <StyledNavBar>
            <BottomTab.Navigator initialRouteName={'CityTab'}>
                <BottomTab.Screen
                    name={'CityTab'}
                    component={CityPage}
                    options={{
                        title: 'Выбор города',
                    }}
                />
                <BottomTab.Screen
                    name={'WeatherTab'}
                    component={WeatherPage}
                    options={{
                        title: 'Сегодня',
                    }}
                />
            </BottomTab.Navigator>
        </StyledNavBar>
    );
};
