import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native';
import { ITransactions } from '../../interfaces/main';
import RNPickerSelect from 'react-native-picker-select';

import {
  Container,
  Content,
  Title,
  ErrorMessage,
  Input,
  ValueInput,
  Label,
  Column,
  Row,

} from './styles'
import Button from '../Button';
import { addDoc, collection, doc, Timestamp } from 'firebase/firestore';
import { database } from '../../config/Firebase';
import { toDateTime } from '../../utils/date';

interface Props {
  toogleForms: () => void,
  setTransactions: Dispatch<SetStateAction<ITransactions[]>>,
}

export default function CreateBudget({ setTransactions, toogleForms }: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState(Timestamp.now());
  const [type, setType] = useState(0);

  const handleSubmit = async () => {
    const newTransaction = {
      budgetRef: doc(database, "Budgets", "AAWUmb1Q9IhhmUJtzG3y"),
      created_at: date,
      name: name,
      type: 0,
      value: value,
      wallet: "Dinheiro"
    }

    await addDoc(collection(database, "Transactions"), newTransaction);
    setTransactions(arr => [...arr, newTransaction]);

    toogleForms();
  }

  return (
    <Container>
      <TouchableOpacity style={{ flex: 1 }} onPress={toogleForms} />
      <Content>
        <Title>Criar Transação</Title>
        <Label>Nome da transação</Label>
        <Input
          onChangeText={setName}
          value={name}
        />
        <Row>
          <Column>
            <Label>Valor da transação</Label>
            <ValueInput
              value={value}
              onChangeValue={text => setValue(text || 0)}
              prefix="R$ "
              delimiter="."
              separator=","
              precision={2}

            />
          </Column>
          <Column>
            <Label>Tipo de Transação</Label>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
              ]}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>Carteira</Label>
            <Input

            />
          </Column>
          <Column>
            <Label>Data da Transação</Label>
            <Input
              value={toDateTime(date.seconds)}
            />
          </Column>
        </Row>
        <Label>Orçamento</Label>
        <Input />
        <Button
          title="Salvar"
          onPress={handleSubmit}
        />
      </Content>
    </Container >

  )
}
