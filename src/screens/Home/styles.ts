import styled from 'styled-components/native'
import CurrencyInput from 'react-native-currency-input'

export const Container = styled.View`
    flex: 1;
    background-color: #fafafa;
`

export const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 8px;
    border-bottom-width: 0.5px;
    border-color: #dadada;
    padding-bottom: 6px;
`

export const Content = styled.View`
    background-color: #fff;
    height: auto;
    margin: 10px 18px;
    padding: 8px 14px;
    border-radius: 20px;
`
export const ButtonContainer = styled.TouchableOpacity`

`

export const ButtonText = styled.Text`
    text-align: center;
    color: #54b8ff;
    font-size: 15px;
    border-top-width: 0.5px;
    border-color: #dadada;
    padding-top: 6px;
`

export const ScrollContainer = styled.ScrollView`
    flex:1;
`

export const Empty = styled.Text`
    margin: 20px 0px;
    color: #444444;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
`
