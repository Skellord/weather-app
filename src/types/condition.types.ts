export type CloudsCoded = 'CL' | 'FW' | 'SC' | 'BK' | 'OV';

// export enum Clouds {
//     'Clear' = ''
// }

export interface Condition {
    WeatherText: string;
    Temperature: Temperature;
    RealFeelTemperature: Temperature;
}

export type ConditionResponse = Condition[];

export interface Temperature {
    Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
    };
    Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
    };
}
