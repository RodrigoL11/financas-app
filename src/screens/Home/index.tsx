import React from 'react';

import Header from '../../components/Header'
import Balance from '../../components/Balance'
import Movements from '../../components/Movements'
import Actions from '../../components/Actions'
import Budget from '../../components/Budget';

import {
    Container,
    Title,
    Content,
    SubTitle,
    ScrollContainer,
    Empty
} from './styles'

const list = [
    // {
    //     id: 1,
    //     label: 'Boleto conta luz',
    //     value: '300,90',
    //     date: '17/09/2022',
    //     type: 0 //despesas
    // },
    // {
    //     id: 2,
    //     label: 'Pix Cliente X',
    //     value: '2.500,00',
    //     date: '17/09/2022',
    //     type: 1 //receita
    // },
    // {
    //     id: 3,
    //     label: 'Salário',
    //     value: '7.200,00',
    //     date: '17/09/2022',
    //     type: 1 //receita
    // },
    // {
    //     id: 4,
    //     label: 'Salário',
    //     value: '7.200,00',
    //     date: '17/09/2022',
    //     type: 1 //receita
    // },
    // {
    //     id: 5,
    //     label: 'Salário',
    //     value: '7.200,00',
    //     date: '17/09/2022',
    //     type: 1 //receita
    // },
]

const budgets = [
    {
        id: 1,
        icon: 'needle',
        name: 'Saúde',
        color: '#ffd391',
        total: 1000,
        used: 100
    },
    {
        id: 2,
        icon: 'car',
        name: 'Uber',
        color: '#fd4d4d',
        total: 400,
        used: 237
    }
]

export interface ListProps {
    [x: string]: any;
    id: number;
    label: string;
    value: string;
    date: string;
    type: number;
}

export default function Home() {
    return (
        <Container>
            <Header name={"Rodrigo Lemes"} />
            <Balance saldo={"9.000,90"} gastos={"-527,00"} />
            <Actions />
            <ScrollContainer>
                <Content>
                    <Title>Orçamentos</Title>
                    {budgets.map(item => (
                        <Budget key={item.id} data={item} />
                    ))}
                    <SubTitle>Adicionar </SubTitle>
                </Content>
                <Content>
                    <Title>Últimas Transações</Title>
                    {list.length > 0 ? list.map(item => (
                        <Movements key={item.id} data={item} />
                    )) : <Empty>Não há nenhuma transação</Empty>}
                    <SubTitle>Ver mais</SubTitle>
                </Content>
            </ScrollContainer>
        </Container>
    )
}