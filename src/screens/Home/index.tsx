import React from 'react';

import Header from '../../components/Header'
import Balance from '../../components/Balance'

const list = [
    {
        id: 1,
        label: 'Boleto conta luz',
        value: '300,90',
        date: '17/09/2022',
        type: 0 //despesas
    },
    {
        id: 2,
        label: 'Pix Cliente X',
        value: '2.500,00',
        date: '17/09/2022',
        type: 1 //receita
    },
    {
        id: 3,
        label: 'Salário',
        value: '7.200,00',
        date: '17/09/2022',
        type: 1 //receita
    }
]

interface ListProps{
    id: number,
    label: string,
    value: string,
    date: string,
    type: number
}

import { 
    Container,
    Title,
    List
} from './styles'

export default function Home(){
    return(
        <Container>
            <Header name={"Rodrigo Lemes"} />
            <Balance saldo={"9.000,90"} gastos={"-527,00"}/>
            <Title>Últimas movimentações</Title>
            <List 
                data={list}
                keyExtractor={ (item: ListProps) => String(item.id) }
                showVerticalScrollIndicator={false}
                renderItem={ (item: ListProps) => <Title>{item.date}</Title>}
            />
        </Container>    
    )
}