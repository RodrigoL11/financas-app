import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import {
    Container,     
    Content,
    Label,
    Value,
    Expenses,
    Skeleton,
    DateLabel

} from './styles'
import { ITransactions } from '../../interfaces/main';
import {  getDoc, DocumentData } from 'firebase/firestore';

function toDateTime(secs: number){
    var date = new Date(secs * 1000);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
}

interface Props{
    data: ITransactions
}

export default function Movements({ data }: Props){
    const [showValue, setShowValue] = useState<Boolean>(false);
    const date = toDateTime(data.created_at.seconds)
    const [budget, setBudget] = useState<DocumentData>()
    
    console.log(data.created_at)

    const getBudget =  async () => {
        const result = await getDoc(data.budgetRef);
        setBudget(result.data());
    }

    useEffect(() => {
        getBudget();
    }, [])    
    
    return(
        <Container activeOpacity={1} onPress={() => {
            console.log(data.budgetRef.id)
            setShowValue(!showValue)
            }}>
            <MaterialCommunityIcons name={budget?.icon} size={34} color="#000"/>
            <DateLabel>{date}</DateLabel>
            <Content>
                <Label>{data.name}</Label>
                { !showValue ? (
                    <Skeleton />
                ) : data.type === 1 ? (
                    <Value>{data.value}</Value>
                ) : (
                    <Expenses>R$ {data.value.toFixed(2)}</Expenses>
                )
                }
            </Content>
        </Container>
    );
}