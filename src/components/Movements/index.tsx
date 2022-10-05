import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import {
    Container,
    Label,
    Value,
    Expenses,
    DateLabel,
    Column,
    Wallet

} from './styles'
import { ITransactions } from '../../interfaces/main';
import { getDoc, DocumentData } from 'firebase/firestore';
import { toDateTime } from '../../utils/date';

function commafy( num: number ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    if (!str[1]) str.push('00');
    while (str[1].length < 2) {
        str[1] += '0'
    }
    
    return str.join('.');
}

interface Props {
    data: ITransactions
}

export default function Movements({ data }: Props) {
    const date = toDateTime(data.created_at.seconds * 1000)    
    const [budget, setBudget] = useState<DocumentData>()

    const getBudget = async () => {
        const result = await getDoc(data.budgetRef);
        setBudget(result.data());
    }

    useEffect(() => {
        getBudget();
    }, [])

    return (
        <Container activeOpacity={1}>
            <Column style={{width: '9.5%'}}>
            <MaterialCommunityIcons name={budget?.icon} size={30} color="#333" />
            </Column>
            <Column style={{marginLeft: 5, width: '60.5%'}}>
                <Label>{data.name}</Label>
                <DateLabel>{date}</DateLabel>
            </Column>
            <Column style={{marginLeft: 5, width: '30%'}}>
            <Wallet>{data.wallet}</Wallet>
            {data.type === 1 ? (
                <Value>R$ {commafy(data.value)}</Value>
            ) : (
                <Expenses>R$ {commafy(data.value)}</Expenses>
            )
            }
            </Column>
        </Container>
    );
}