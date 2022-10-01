import React, { Dispatch, SetStateAction, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import { IBudget } from '../../interfaces/main';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import {
  Container,
  Content,
  Title,
  ErrorMessage,
  OptionContainer,
  Input,
  ValueInput,
  Label,
  Options,
} from './styles'
import Button from '../Button';
import { addDoc, collection } from 'firebase/firestore';
import { database } from '../../config/Firebase';

interface Props {
  toogleForms: () => void,
  setBudgets: Dispatch<SetStateAction<IBudget[]>>,
}

interface IOption{
  name: keyof typeof MaterialCommunityIcons.glyphMap,
  isActive: boolean,
  onPress: () => void
}

const Option = ({ name, isActive, onPress }: IOption) => {
  return (
    <OptionContainer activeOpacity={1} onPress={onPress} style={isActive ? { backgroundColor: "#00000021" } : null}>
      <MaterialCommunityIcons name={name} size={38} color={isActive ? "#2596be" : "#242222"} />
    </OptionContainer>
  )
}

export default function CreateBudget({ setBudgets, toogleForms }: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [category, setCategory] = useState("");

  const handleSubmit = async () => {
    const randomColor = '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7);

    const newBudget = {
      color: randomColor,
      icon: category,
      name: name,
      total: value,
      used: 0
    }

    await addDoc(collection(database, "Budgets"), newBudget);
    setBudgets(arr => [...arr, newBudget]);

    toogleForms();
  }

  return (
    <Container>
      <TouchableOpacity style={{ flex: 1 }} onPress={toogleForms} />
      <Content>
        <Title>Criar Orçamento</Title>
        <Label> Nome</Label>
        <Input
          onChangeText={setName}
          value={name}
        />
        <Label>Valor</Label>
        <ValueInput
          value={value}
          onChangeValue={text => setValue(text || 0)}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          
        />
        <Options>
          <Option onPress={() => setCategory("car-side")} isActive={category === "car-side"} name="car-side" />
          <Option onPress={() => setCategory("needle")} isActive={category === "needle"} name="needle" />
          <Option onPress={() => setCategory("umbrella-beach")} isActive={category === "umbrella-beach"} name="umbrella-beach" />
          <Option onPress={() => setCategory("piggy-bank")} isActive={category === "piggy-bank"} name="piggy-bank" />
          <Option onPress={() => setCategory("hamburger")} isActive={category === "hamburger"} name="hamburger" />
        </Options>
        <Button
          title="Salvar"
          onPress={handleSubmit}
        />
      </Content>
    </Container >

  )
}
