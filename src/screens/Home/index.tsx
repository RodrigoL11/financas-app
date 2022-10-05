import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import { DocumentData, getDocs, collection, addDoc } from 'firebase/firestore';

import { database } from '../../config/Firebase'
import { IBudget, ITransactions } from '../../interfaces/main';


import UserCard from '../../components/UserCard'
import Balance from '../../components/Balance'
import Movements from '../../components/Movements'
import Actions from '../../components/Actions'
import Budget from '../../components/Budget';
import Loading from '../../components/Loading';
import CreateBudget from '../../components/HomeForms/CreateBudget';
import CreateTransaction from '../../components/HomeForms/CreateTransaction';

import {
   Container,
   Title,
   Content,
   ButtonText,
   ScrollContainer,
   Empty,
   ButtonContainer,
} from './styles'

export default function Home() {
   const [transactions, setTransactions] = useState<ITransactions[]>([]);
   const [budgets, setBudgets] = useState<IBudget[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [showForms, setShowForms] = useState(false);
   const [type, setType] = useState("")

   const toogleForms = () => {
      setShowForms(!showForms);
   }

   const loadData = async () => { 
      setBudgets([])
      setTransactions([])
      
      const queryTransactions = await getDocs(collection(database, "Transactions"));
      queryTransactions.forEach((doc) => {         
         setTransactions(arr => [...arr, doc.data() as ITransactions])
      });

      const queryBudgets = await getDocs(collection(database, "Budgets"));
      queryBudgets.forEach((doc) => {
         let result = doc.data();
         result.id = doc.id;
         setBudgets(arr => [...arr, result as IBudget]);
      });
   }

   useEffect(() => {
      setIsLoading(true);

      loadData();

      setIsLoading(false);
   }, [])

   if (isLoading) {
      return (
         <Loading />
      )
   }

   const types = {
      'create-budget': <CreateBudget setBudgets={setBudgets} toogleForms={toogleForms} />,
      'create-transaction': <CreateTransaction budgets={budgets} setBudgets={setBudgets} setTransactions={setTransactions} toogleForms={toogleForms} />
   }

   return (
      <Container>
         <UserCard name={"Rodrigo Lemes"} />
         <Balance saldo={"100,00"} gastos={"50,00"} />
         <Actions />
         <ScrollContainer>
            <Content>
               <Title>Orçamentos</Title>
               {budgets.length > 0 ? budgets.map((item, index) => (
                  <Budget key={index} data={item} />
               )) : (<Empty>Não há nenhum orçamento</Empty>)}
               <ButtonContainer onPress={() => {
                  setType('create-budget')
                  toogleForms();
               }}>
                  <ButtonText>Criar Orçamento</ButtonText>
               </ButtonContainer>
            </Content>
            <Content>
               <Title>Últimas Transações</Title>
               {transactions.length > 0 ? transactions.map((item, index) => (
                  <Movements key={index} data={item} />
               )) : (<Empty>Não há nenhuma transação</Empty>)}
               <ButtonContainer onPress={() => {
                  setType('create-transaction');
                  toogleForms();
               }}>
                  <ButtonText>Criar Transação</ButtonText>
               </ButtonContainer>
            </Content>
         </ScrollContainer>

         <Modal
            visible={showForms}
            transparent={true}
            onRequestClose={toogleForms}
         >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
               {types[type as keyof typeof types]}
            </TouchableWithoutFeedback>
         </Modal>
      </Container>
   )
}