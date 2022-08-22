import React from 'react';
import { ActivityIndicator } from 'react-native';

import { 
    Container,
    Label
} from './styles'

export default function Loading(){
    return(
        <Container>
            <ActivityIndicator size="large" color="#dadada" />
            <Label>Loading...</Label>
        </Container>
    );
}