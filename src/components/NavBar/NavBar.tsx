import React, { FC } from 'react';
import { StyledNavBar } from './NavBar.styled';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../types/navigation.types';
import CityPage from '../../pages/CityPage/CityPage';
import ForecastPage from '../../pages/ForecastPage/ForecastPage';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export const NavBar: FC = () => {
    return (
        <StyledNavBar>
            <BottomTab.Navigator initialRouteName={'CityTab'}>
                <BottomTab.Screen
                    name={'CityTab'}
                    component={CityPage}
                    options={{
                        title: 'Сегодня',
                        tabBarIconStyle: { display: 'none' },
                        tabBarItemStyle: { justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#efefef' },
                    }}
                />
                <BottomTab.Screen
                    name={'ForecastTab'}
                    component={ForecastPage}
                    options={{
                        title: '5 дней',
                        tabBarIconStyle: { display: 'none' },
                        tabBarItemStyle: { justifyContent: 'center' },
                    }}
                />
            </BottomTab.Navigator>
        </StyledNavBar>
    );
};
