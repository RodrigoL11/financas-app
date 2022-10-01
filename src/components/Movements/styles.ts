import styled from 'styled-components/native'

export const Container = styled.TouchableOpacity`
    margin: 5px 0px;
`
export const DateLabel = styled.Text`
    color: #dadada;
    font-weight: bold;
`

export const Content = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2px;
    margin-bottom: 8px;
`

export const Label = styled.Text`
    font-weight: bold;
    font-size: 16px;
`

export const Value = styled.Text`
    font-size: 16px;
    color: #2ecc71;
    font-weight: bold;
`

export const Expenses = styled.Text`
    font-size: 16px;
    color: #e74c3c;
    font-weight: bold;
`

export const Skeleton = styled.View`
    margin-top: 6px;
    width: 80px;
    height: 10px;
    background-color: #DADADA;
    border-radius: 8px;
`