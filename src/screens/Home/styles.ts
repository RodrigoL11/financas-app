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
    font-size: 16px;
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

export const ModalView = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000099;
    align-items: center;
    position: absolute;
`

export const Background = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const BudgetForm = styled.View`
    width: 100%;
    height: 330px;
    background-color: #fff;
    padding: 20px 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    align-items: center;
`

export const BudgetTitle = styled.Text`
    font-weight: bold;
    font-size: 24px;
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
`

export const Label = styled.Text`
    font-size: 13px;
    width: 100%;
`

export const Input = styled.TextInput`
    border-bottom-width: 1px;
    border-color: #dadada;
    width: 100%;
    margin-bottom: 20px;
`

export const ValueInput = styled(CurrencyInput)`
    border-bottom-width: 1px;
    border-color: #dadada;
    width: 100%;
    margin-bottom: 20px;
`

export const BudgetButton = styled.TouchableOpacity`
    width: 100%;
    height: 45px;
    background-color: #2596be;
    border-radius: 14px;
    align-items: center;
    justify-content: center;
`

export const BudgetButtonTitle = styled.Text`
    color: #fff;
    font-size: 20px;
    font-weight: bold;
`

export const Options = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
`
