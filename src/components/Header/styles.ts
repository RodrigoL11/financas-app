import styled from 'styled-components/native'

interface ContainerProps{
    height: number;
}

export const Container = styled.View<ContainerProps>`
    background-color: #8000ff;
    padding-top: ${(props) => props.height || 22}px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 44px;
    flex-direction: row;
    height: auto;
`

export const Content = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

export const Username = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
`

export const IconButton = styled.TouchableOpacity`
    width: 44px;
    height: 44px;
    background-color: rgba(255, 255, 255, 0.5);
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
`