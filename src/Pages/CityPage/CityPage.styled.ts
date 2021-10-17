import styled from 'styled-components/native';

export const StyledAutocompleteContainer = styled.SafeAreaView`
    flex: 1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
`;

export const StyledInput = styled.TextInput`
    background: white;
    padding: 8px;
    height: 40px;
`;

export const StyledList = styled.FlatList`
    background: white;
    flex: 1;
    width: 100%;
`;

export const StyledListItem = styled.Text`
    padding: 16px;
    font-size: 14px;
    color: black;
    opacity: 1;
    z-index: 10;
`;
