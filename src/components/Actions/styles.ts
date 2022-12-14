import styled from 'styled-components/native'

export const Container = styled.View`
    max-height: 84px;
    margin-bottom: 14px;
    margin-top: 18px;
    padding: 0px 14px;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

export const ActionButton = styled.TouchableOpacity`
    align-items: center;
    margin: 0 16px;
`

export const AreaButton = styled.View`
    background-color: #ecf0f1;
    height: 60px;
    width: 60px;
    border-radius: 999px;
    justify-content: center;
    align-items: center;
`

export const Label = styled.Text`
    margin-top: 4px;
    text-align: center;
    font-weight: bold;
`