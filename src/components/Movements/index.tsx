import React, { useState } from 'react'

import {
    Container, 
    Date,
    Content,
    Label,
    Value,
    Expenses,
    Skeleton

} from './styles'

import { ListProps } from '../../screens/Home';

interface Props{
    data: ListProps;
}

export default function Movements({ data }: Props){
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