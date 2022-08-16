import React from 'react'
import { Float } from 'react-native/Libraries/Types/CodegenTypes'

import {
    Container, 
    CurrencySymbol, 
    Item,
    ItemTitle,
    Saldo,
    Content,
    Expenses
} from './styles'

interface BalanceProps{
    saldo: string,
    gastos: string
}

export default function Balance({ saldo, gastos }: BalanceProps){
    console.log(saldo, gastos)

    return(
        <Container>
            <Item>
                <ItemTitle>Saldo</ItemTitle>
                <Content>
                    <CurrencySymbol>R$</CurrencySymbol>
                    <Saldo>{saldo}</Saldo>
                </Content>
            </Item>
            <Item>
                <ItemTitle>Gastos</ItemTitle>
                <Content>
                    <CurrencySymbol>R$</CurrencySymbol>
                    <Expenses>{gastos}</Expenses>
                </Content>
            </Item>
        </Container>
    )
}