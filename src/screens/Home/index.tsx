import React, { useEffect, useState } from 'react';

import { DocumentData, getDocs, collection } from 'firebase/firestore';
import { database } from '../../config/Firebase'

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
    SubTitle,
    ScrollContainer,
    Empty,
} from './styles'

export default function Home() {
    const [transactions, setTransactions] = useState<DocumentData[]>([]);
    const [budgets, setBudgets] = useState<DocumentData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function queryDB(){
          const querySnapshot = await getDocs(collection(database, "Transactions"));
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setTransactions(arr => [...arr, doc.data()])
          });
        }
    
         queryDB();
      }, [])

      useEffect(() => {
        setIsLoading(true);
        async function queryDB(){
            const querySnapshot = await getDocs(collection(database, "Budgets"));
            querySnapshot.forEach((doc) => {
                setBudgets(arr => [...arr, doc.data()]);
            });
          }
      
          queryDB();
          setIsLoading(false);
      }, [])

      if(isLoading) {
        return <Loading />
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
                    <SubTitle>Adicionar </SubTitle>
                </Content>
                <Content>
                    <Title>Últimas Transações</Title>
                    {transactions.length > 0 ? transactions.map(item => (
                        <Movements key={item.id} data={item} />
                    )) : (<Empty>Não há nenhuma transação</Empty>)}
                    <SubTitle>Ver mais</SubTitle>
                </Content>
            </ScrollContainer>
        </Container>
    )
}