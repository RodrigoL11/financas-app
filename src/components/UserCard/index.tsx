import React from 'react';
import { StatusBar } from 'react-native';

import {
    Container,
    Content,
    Username,
    IconButton
} from './styles'

import { Feather } from '@expo/vector-icons'

const StatusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

interface HeaderProps{
    name: string;
}

export default function UserCard({name}: HeaderProps){
    return(
        <Container height={StatusBarHeight}>
            <Content>
                <Username>{name}</Username>
                <IconButton activeOpacity={0.9}>
                    <Feather name="user" size={27} color="#fff" />
                </IconButton>
            </Content>
        </Container>
    )
}