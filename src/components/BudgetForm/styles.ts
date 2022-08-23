import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: #000000aa;
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: center;
    justify-content: flex-end;
`

export const Content = styled.View`
    width: 100%;
    height: 330px;
    background-color: #fff;
    padding: 20px 30px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    align-items: center;
`

export const Title = styled.Text`
    font-weight: bold;
    font-size: 24px;
    width: 100%;
    margin-bottom: 20px;
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

export const ButtonContainer = styled.View`
    width: 100%;
    height: 45px;
    background-color: #0066ff;
    border-radius: 14px;
    align-items: center;
    justify-content: center;
`

export const ButtonTitle = styled.Text`
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