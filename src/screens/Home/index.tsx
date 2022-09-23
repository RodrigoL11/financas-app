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
   ValueInput
} from './styles'

export default function Home() {
   const [transactions, setTransactions] = useState<DocumentData[]>([]);
   const [budgets, setBudgets] = useState<DocumentData[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [showBudgetForm, setShowBudgetForm] = useState(false);
   const [name, setName] = useState("");
   const [value, setValue] = useState(0);

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
                        <FontAwesome5 name="car-side" size={32} outline color={"#000"} />
                        <FontAwesome5 name="briefcase-medical" size={32} color={"#000"} />
                        <FontAwesome5 name="umbrella-beach" size={32} color={"#000"} />
                        <FontAwesome5 name="piggy-bank" size={32} color={"#000"} />
                        <FontAwesome5 name="hamburger" size={32} color={"#000"} />
                     </Options>
                     <BudgetButton>
                        <BudgetButtonTitle>Finalizar</BudgetButtonTitle>
                     </BudgetButton>
                  </BudgetForm>
               </TouchableWithoutFeedback>
            </ModalView>
         </Modal>
      </Container>
   )
}