import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import { DocumentData, getDocs, collection } from 'firebase/firestore';
import { database } from '../../config/Firebase'

import { FontAwesome5 } from '@expo/vector-icons'

import Header from '../../components/Header'
import Balance from '../../components/Balance'
import Movements from '../../components/Movements'
import Actions from '../../components/Actions'
import Budget from '../../components/Budget';
import Loading from '../../components/Loading';

import {
   Container,
   Title,
   Content,
   ButtonText,
   ScrollContainer,
   Empty,
   ButtonContainer,
   Background,
   ModalView,
   BudgetButton,
   BudgetButtonTitle,
   BudgetForm,
   BudgetTitle,
   Input,
   Label,
   Options,
   ValueInput,
   OptionContainer
} from './styles'


interface IOption{
   name: keyof typeof FontAwesome5.glyphMap;
   isActive: boolean;
   onPress: () => void;
}

export default function Home() {
   const [transactions, setTransactions] = useState<DocumentData[]>([]);
   const [budgets, setBudgets] = useState<DocumentData[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [showBudgetForm, setShowBudgetForm] = useState(false);
   const [name, setName] = useState("");
   const [value, setValue] = useState(0);
   const [category, setCategory] = useState("");

   const toogleBudgetForm = () => {
      setName("");
      setValue(0);
      setShowBudgetForm(!showBudgetForm);
   }

   useEffect(() => {
      setIsLoading(true);

      if (budgets.length == 0) {
         async function queryTransactions() {
            const querySnapshot = await getDocs(collection(database, "Transactions"));
            querySnapshot.forEach((doc) => {
               if (doc.data() != transactions[0])
                  setTransactions(arr => [...arr, doc.data()])
            });
         }

         async function queryBudgets() {
            const querySnapshot = await getDocs(collection(database, "Budgets"));
            querySnapshot.forEach((doc) => {
               if (doc.data() != budgets[0])
                  setBudgets(arr => [...arr, doc.data()]);
            });
         }

         queryTransactions()
         queryBudgets();
      }

      setIsLoading(false);
   }, [])

   if (isLoading) {
      return (
         <Loading />
      )
   }

   const Option = ({name, isActive, onPress}: IOption) => {
      return(
         <OptionContainer onPress={onPress} style={isActive ? {backgroundColor: "#00000077"} : null}>
            <FontAwesome5 name={name} size={32} color={isActive ? "#2596be" : "#000"}/>
         </OptionContainer>
      )
   }

   return (
      <Container>
         <Header name={"Rodrigo Lemes"} />
         <Balance saldo={"9.000,90"} gastos={"-527,00"} />
         <Actions />
         <ScrollContainer>
            <Content>
               <Title>Orçamentos</Title>
               {budgets.length > 0 ? budgets.map(item => (
                  <Budget key={item.id} data={item} />
               )) : (<Empty>Não há nenhum orçamento</Empty>)}
               <ButtonContainer onPress={() => setShowBudgetForm(!showBudgetForm)}>
                  <ButtonText>Adicionar</ButtonText>
               </ButtonContainer>
            </Content>
            <Content>
               <Title>Últimas Transações</Title>
               {transactions.length > 0 ? transactions.map(item => (
                  <Movements key={item.id} data={item} />
               )) : (<Empty>Não há nenhuma transação</Empty>)}
               <ButtonContainer>
                  <ButtonText>Ver mais</ButtonText>
               </ButtonContainer>
            </Content>
         </ScrollContainer>

         <Modal
            visible={showBudgetForm}
            transparent={true}
            onRequestClose={toogleBudgetForm}
         >
            <ModalView>
               <Background onPress={toogleBudgetForm} />
               <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                  <BudgetForm>
                     <BudgetTitle>Criar Orçamento</BudgetTitle>
                     <Label>Nome</Label>
                     <Input
                        onChangeText={setName}
                        value={name}
                     />
                     <Label>Valor</Label>
                     <ValueInput
                        value={value}
                        onChangeValue={value => setValue(value || 0)}
                        prefix="R$ "
                        delimiter="."
                        separator=","
                        precision={2}
                        onChangeText={(text) => {
                           console.log(text); // $2,310.46
                        }}
                     />
                     <Options>
                        <Option onPress={() => setCategory("car-side")} isActive={category === "car-side"} name="car-side" />
                        <Option onPress={() => setCategory("briefcase-medical")} isActive={category === "briefcase-medical"} name="briefcase-medical" />
                        <Option onPress={() => setCategory("umbrella-beach")} isActive={category === "umbrella-beach"} name="umbrella-beach" />
                        <Option onPress={() => setCategory("piggy-bank")} isActive={category === "piggy-bank"} name="piggy-bank" />
                        <Option onPress={() => setCategory("hamburger")} isActive={category === "hamburger"} name="hamburger" />
                     </Options>
                     <BudgetButton onPress={() => console.log('oi')}>
                        <BudgetButtonTitle>Finalizar</BudgetButtonTitle>
                     </BudgetButton>
                  </BudgetForm>
               </TouchableWithoutFeedback>
            </ModalView>
         </Modal>
      </Container>
   )
}