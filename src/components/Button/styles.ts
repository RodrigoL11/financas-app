import styled from 'styled-components/native'

interface Props{
  reverse?: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
  width: 100%;
  padding: 10px;
  align-items: center;
  justify-content: center;
  background-color: #2596be;
  margin-bottom: 8px;
  border-radius: 14px;
`

export const Title = styled.Text<Props>`
  font-size: 15px;
  color: #fff;
`