import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LinkingConfiguration from './LinkingConfiguration';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation.types';
import { NavBar } from '../components/NavBar/NavBar';
import { View } from 'react-native';

const Navigation: FC = () => {
    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer linking={LinkingConfiguration}>
                <RootNavigator />
            </NavigationContainer>
        </View>
    );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Root'} component={NavBar} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Navigation;
