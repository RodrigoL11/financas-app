import React from 'react'

import {
    BarContainer,
    Bar,
    Container, 
    Description, 
    Name, 
    Remaining,
    Row,
    Content
} from './styles'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DocumentData } from 'firebase/firestore';

export default function Budget({ data }: DocumentData){
    const icon = data.icon as keyof typeof MaterialCommunityIcons.glyphMap;
    const barProgression = ((data.used + 0.001) / (data.total + 0.001)) * 100

    return(
        <Container activeOpacity={0.5}>
            <MaterialCommunityIcons name={icon} size={28} color={'#000'} />
            <Content>
                <Row>
                    <Name>{data.name}</Name>
                    <Remaining>R$ {(data.total - data.used).toFixed(2)} sobrando</Remaining>
                </Row>
                <BarContainer>
                    <Bar width={barProgression} color={data.color}/>
                </BarContainer>
                <Description>R$ {data.used.toFixed(2)} de R$ {data.total.toFixed(2)}</Description>
            </Content>
        </Container>
    );
}