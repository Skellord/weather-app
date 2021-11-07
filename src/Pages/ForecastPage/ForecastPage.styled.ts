import styled from 'styled-components/native';

export const StyledForecast = styled.View`
    flex: 1;
`;

export const StyledList = styled.FlatList``;

export const StyledListItem = styled.View`
    display: flex;
    flex-shrink: 1;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #e0e0e0;
`;

export const StyledWeatherText = styled.Text`
    text-align: right;
    margin-bottom: 8px;
`;

export const StyledWeatherWrapper = styled.View`
    margin-left: auto;
    align-items: flex-end;
    max-width: 200px;
`;
