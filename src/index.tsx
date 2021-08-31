import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import conditionsApi, { ConditionsResponse } from './api/conditionsApi';
import { trackPromise } from 'react-promise-tracker';

export const Demo = () => {
    const [data, setData] = useState<ConditionsResponse>();
    const latitude = '53.4304656';
    const longitude = '59.0031243';
    const getPosition = async () => {
        try {
            const response: ConditionsResponse =
                (await conditionsApi.getConditionRequest(latitude, longitude)) || void 0;
            if (response?.success) {
                console.log(response);
                setData(response);
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        void trackPromise(getPosition());
    }, []);

    return (
        <Text>
            Weather in {data?.response[0].place.name} is {data?.response[0].periods[0].tempC} C. Feels like{' '}
            {data?.response[0].periods[0].feelslikeC}
        </Text>
    );
};
