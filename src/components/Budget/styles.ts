import styled from "styled-components/native";

interface BarProps{
    width: number;
    color: string;
}

export const Container = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-bottom: 12px;
`

export const Content = styled.View`
    margin-left: 10px;
    flex: 1;
`

export const Name = styled.Text`

`

export const Remaining = styled.Text`

`

export const BarContainer = styled.View`
    width: 100%;
    height: 8px;
    background-color: #bbb;
    border-radius: 20px;
    z-index: -1;
`

export const Bar = styled.View<BarProps>`
    width: ${(props) => props.width}%;
    height: 8px;
    background-color: ${(props) => props.color};
    border-radius: 20px;
    z-index: 999;
`

export const Description = styled.Text`

`

export const Row = styled.View`
    flex-direction: row;
    justify-content: space-between;
`