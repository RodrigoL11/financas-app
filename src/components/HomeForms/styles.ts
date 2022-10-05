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
    height: 380px;
    background-color: #fff;
    padding: 0 28px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    justify-content: space-around;
`

export const Title = styled.Text`
    font-size: 23px;
    font-weight: bold;
`

export const ErrorMessage = styled.Text`
    color: red;
    font-weight: bold;
    font-size: 10.5px;
    top: -1px;
    letter-spacing: 0.5px;
`

export const Options = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
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
    
    font-size: 14px;
`

export const ValueInput = styled(CurrencyInput)`
    border-bottom-width: 1.5px;
    border-color: #dadada;
    width: 100%;
`

export const DateContainer = styled.TouchableOpacity`
    border-bottom-width: 1.5px;
    border-color: #dadada;
    width: 100%;
    flex-direction: row;
    padding: 4px 0;
    align-items: center;
    justify-content: space-between;
    padding-right: 4px;
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

export const ModalContent = styled.View`
    padding: 13px 50px;
    background-color: #fff;
    width: 70%;
    border-radius: 17px;
    height: 140px;
    
`

export const DateText = styled.Text`
    padding: 5px 0;
    border-bottom-width: 1px;
    border-color: #d5d8d9;
    font-size: 14px;
    color: #2e2f2f;
    margin-bottom: 8px;
`

export const DateButton = styled.TouchableOpacity`
    background-color: #2596be;
    height: 52px;
    width: 52px;
    border-radius: 14px;
    align-items: center;
    justify-content: center;  
`

export const DateLabel = styled.Text`
    top: 1px;
    color: #fff;
    font-size: 10.5px;
    font-weight: 500;
`