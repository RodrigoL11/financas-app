import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Alert, Platform, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker, { DateTimePickerEvent, AndroidMode } from '@react-native-community/datetimepicker';
import { addDoc, collection, doc, getDocs, Timestamp } from 'firebase/firestore';

import { IBudget, ITransactions } from '../../interfaces/main';
import Button from '../Button';
import { database } from '../../config/Firebase';
import { toDateTime } from '../../utils/date';

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

interface Props {
  toogleForms: () => void,
  setTransactions: Dispatch<SetStateAction<ITransactions[]>>,
}


interface BudgetsProps {
  label: string,
  value: string
}

interface DropDownProps {
  placeholder: string,
  value: number | string,
  setValue: Dispatch<SetStateAction<any>>,
  items: any[]
}

const DropDown = ({ placeholder, value, setValue, items }: DropDownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      placeholder={placeholder}
      dropDownContainerStyle={{ borderWidth: 1.5, borderColor: '#dadada' }}
      style={{ borderWidth: 1.5, borderColor: "#dadada" }}
      textStyle={{ fontSize: 12 }}
      dropDownDirection='TOP'
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
    />
  );
}

export default function CreateBudget({ setTransactions, toogleForms }: Props) {
  const [name, setName] = useState("");
  const [value, setValue] = useState<number>(0);
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [type, setType] = useState(0);
  const [wallet, setWallet] = useState("");
  const [budget, setBudget] = useState("");
  const [budgets, setBudgets] = useState<BudgetsProps[]>([]);  

  const onChangeDate = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  }

  const onChangeTime = (event: DateTimePickerEvent, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowTime(false);
    setDate(currentDate);
  }

  const showDateTime = () => {
    setShowDate(true);
    setShowTime(true);
  }

  let wallets = [
    { label: "Dinheiro Físico", value: "Dinheiro" },
    { label: "Cartão Crédito", value: "Cartão Crédito" }
  ];

  const loadData = async () => {
    if (budget.length === 0) {
      const results = await getDocs(collection(database, "Budgets"));
      results.forEach((doc) => {
        const budget = doc.data() as IBudget;
        setBudgets(arr => [...arr, { label: budget.name, value: doc.id }]);
      });
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const handleSubmit = async () => {
    // const newTransaction = {
    //   budgetRef: doc(database, "Budgets", budget),
    //   created_at: date,
    //   name: name,
    //   type: type,
    //   value: value,
    //   wallet: wallet
    // }

    // await addDoc(collection(database, "Transactions"), newTransaction);
    // setTransactions(arr => [...arr, newTransaction]);

    // toogleForms();
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
              onChangeValue={(text: number) => setValue(text || 0)}
              prefix="R$ "
              delimiter="."
              separator=","
              precision={2}
            />
          </Column>
          <Column>
            <DropDown
              placeholder='Tipo de transação'
              value={type}
              setValue={setType}
              items={[
                { label: 'Saída', value: '0' },
                { label: 'Entrada', value: '1' },
              ]}
            />
          </Column>
        </Row>
        <Row>
          <Column>
            <DropDown
              placeholder='Carteira'
              value={wallet}
              setValue={setWallet}
              items={wallets}
            />
          </Column>
          <Column>
            <Label>Data da Transação</Label>
            <Input
              value={date.toLocaleString()}
            />
          </Column>
        </Row>
        <DropDown
          placeholder='Orçamento'
          value={budget}
          setValue={setBudget}
          items={budgets}
        />
        <Button
          style={{ marginTop: 8 }}
          title="Salvar"
          onPress={showDateTime}
        />
      
      {showTime && (
        <DateTimePicker
        testID='dateTimePicker'
        value={date}
        mode={'time'}
        is24Hour={true}
        display='default'
        onChange={onChangeTime}
      />
      )}
      
      {showDate && (        
        <DateTimePicker 
          testID='dateTimePicker'
          value={date}
          mode={'date'}
          is24Hour={true}
          display='default'
          onChange={onChangeDate}
        />        
      )}
      </Content>
    </Container >

  )
}
