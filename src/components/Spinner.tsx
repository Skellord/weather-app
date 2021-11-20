import React from 'react';
import { Text, View } from 'react-native';

export const Spinner = () => (
    <View
        style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
        }}
    >
        <Text>Loading...</Text>
    </View>
);
