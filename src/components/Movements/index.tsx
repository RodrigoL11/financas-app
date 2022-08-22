import React, { useState } from 'react'
import { DocumentData } from 'firebase/firestore';

import {
    Container, 
    Date,
    Content,
    Label,
    Value,
    Expenses,
    Skeleton

} from './styles'

export default function Movements({ data }: DocumentData){
    const [showValue, setShowValue] = useState<Boolean>(false);

    return(
        <Container onPress={() => {setShowValue(!showValue)}}>
            <Date>{data.date}</Date>
            <Content>
                <Label>{data.label}</Label>
                { !showValue ? (
                    <Skeleton />
                ) : data.type === 1 ? (
                    <Value>{data.value}</Value>
                ) : (
                    <Expenses>{data.value}</Expenses>
                )
                }
            </Content>
        </Container>
    );
}