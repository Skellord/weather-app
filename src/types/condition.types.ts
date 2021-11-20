export interface Condition {
    WeatherText: string;
    WeatherIcon: number;
    Temperature: Temperature;
    RealFeelTemperature: Temperature;
}

export type ConditionResponse = Condition[];

interface TemperatureValues {
    Value: number;
    Unit: string;
    UnitType: number;
}

export interface Temperature {
    Metric: TemperatureValues;
    Imperial: TemperatureValues;
}

export interface Forecast {
    Date: string;
    Temperature: {
        Minimum: TemperatureValues;
        Maximum: TemperatureValues;
    };
    Day: {
        IconPhrase: string;
    };
}

export interface ForecastResponse {
    Headline: {
        EffectiveDate: string;
        Text: string;
        Category: string;
    };
    DailyForecasts: Forecast[];
}
