import styled from 'styled-components/native';

export const StyledWeatherPage = styled.View`
    flex: 1;
    align-items: center;
    background: #000;
`;

export const StyledCity = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: #fff;
    text-transform: capitalize;
    margin-bottom: 12px;
`;

export const StyledStatusImage = styled.Image`
    width: 250px;
    height: 250px;
`;

export const StyledTemp = styled.Text`
    font-size: 40px;
    color: #fff;
`;

export const StyledTempText = styled.Text`
    font-size: 28px;
    color: #fff;
`;

export const StyledFeelsText = styled.Text`
    font-size: 16px;
    color: #fff;
    margin-bottom: 24px;
`;
