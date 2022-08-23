import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";

import {
  Container,
  Content,
  Title,
  Input,
  ButtonContainer,
  ButtonTitle,
  Label,
  Options,
} from "./styles";

export default function BudgetForm() {
  return (
    <Container>
      <Content>
        <Title>Criar Orçamento</Title>
        <Label>Nome</Label>
        <Input />
        <Label>Valor</Label>
        <Input />
        <Options>
          <FontAwesome5 name="car-side" size={32} outline color={"#000"} />
          <FontAwesome5 name="briefcase-medical" size={32} color={"#000"} />
          <FontAwesome5 name="umbrella-beach" size={32} color={"#000"} />
          <FontAwesome5 name="piggy-bank" size={32} color={"#000"} />
          <FontAwesome5 name="hamburger" size={32} color={"#000"} />
        </Options>
        <ButtonContainer>
          <ButtonTitle>Finalizar</ButtonTitle>
        </ButtonContainer>
      </Content>
    </Container>
  );
}
