import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native';
import { ITransactions } from '../../interfaces/main';

import {
  Container,
  Content,
  Title,
  ErrorMessage,
  Input,
  ValueInput,
  Label,
  
} from './styles'
import Button from '../Button';
import { addDoc, collection, doc, Timestamp } from 'firebase/firestore';
import { database } from '../../config/Firebase';

interface Props {
  toogleForms: () => void,
  setTransactions: Dispatch<SetStateAction<ITransactions[]>>,
}

export default function CreateBudget({ setTransactions, toogleForms }: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [type, setType] = useState(0);
  
 
  const handleSubmit = async () => {
    const newTransaction = {
      budgetRef: doc(database, "Budgets", "AAWUmb1Q9IhhmUJtzG3y"),
      created_at: Timestamp.now(),
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
        <Button
          title="Salvar"
          onPress={handleSubmit}
        />
      </Content>
    </Container >

  )
}
