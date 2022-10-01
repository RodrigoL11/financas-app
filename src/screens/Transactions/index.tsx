import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header'

import {
  Container,
  Content
} from './styles'

export default function Transactions(){
  const navigation = useNavigation();

  return(
    <Container>
      <Header title="Entradas" onPress={navigation.goBack} />
      <Content>
        
      </Content>
    </Container>
  )
}
