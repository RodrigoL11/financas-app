import CurrencyInput from 'react-native-currency-input'
import styled from 'styled-components/native'

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000099;
    padding: 0 10px;
    position: absolute;
    justify-content: flex-end;
`

export const Content = styled.View`
    width: 100%;
    height: 360px;
    background-color: #fff;
    padding: 0 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

`

export const Title = styled.Text`
    font-size: 23px;
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 16px;

`

export const ErrorMessage = styled.Text`
    color: red;
    font-weight: bold;
    font-size: 10.5px;
    top: -5px;
    letter-spacing: 0.5px;
`

export const Options = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
`

export const OptionContainer = styled.TouchableOpacity`
    width: 54px;
    height: 54px;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
`

export const Input = styled.TextInput`
    border-bottom-width: 1.5px;
    border-color: #dadada;
    width: 100%;
    margin-bottom: 15px;
`

export const ValueInput = styled(CurrencyInput)`
    border-bottom-width: 1.5px;
    border-color: #dadada;
    width: 100%;
    margin-bottom: 20px;
`

export const Label = styled.Text`
    font-size: 11px;
    width: 100%;
    font-weight: 500;
    color: #444;
`

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;    
`

export const Column = styled.View`
    width: 48%;
`