import React, { useEffect, useState } from 'react';

import { DocumentData, getDocs, collection } from 'firebase/firestore';
import { database } from '../../config/Firebase'

import Header from '../../components/Header'
import Balance from '../../components/Balance'
import Movements from '../../components/Movements'
import Actions from '../../components/Actions'
import Budget from '../../components/Budget';
import Loading from '../../components/Loading';
import BudgetForm from '../../components/BudgetForm';

import {
    Container,
    Title,
    Content,
    ButtonText,
    ScrollContainer,
    Empty,
    ButtonContainer
} from './styles'

export default function Home() {
    const [transactions, setTransactions] = useState<DocumentData[]>([]);
    const [budgets, setBudgets] = useState<DocumentData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showBudgetForm, setShowBudgetForm] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        
        async function queryTransactions(){
          const querySnapshot = await getDocs(collection(database, "Transactions"));
          querySnapshot.forEach((doc) => {
            if(doc.data() != transactions[0])
                setTransactions(arr => [...arr, doc.data()])
          });
        }

        async function queryBudgets(){
            const querySnapshot = await getDocs(collection(database, "Budgets"));
            querySnapshot.forEach((doc) => {
                if(doc.data() != budgets[0])
                    setBudgets(arr => [...arr, doc.data()]);
            });
        }
    
        queryTransactions()
        queryBudgets();

        setIsLoading(false);
      }, [])

    if(isLoading){
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
            {showBudgetForm ?  <BudgetForm onPress={() => setShowBudgetForm(false)} /> : null}
        </Container>
    )
}