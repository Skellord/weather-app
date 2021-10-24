import React, { FC } from 'react';
import { StyledNavBar } from './NavBar.styled';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../types/navigation.types';
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
            </BottomTab.Navigator>
        </StyledNavBar>
    );
};
