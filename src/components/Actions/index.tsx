import React from 'react';

import { 
    Container,
    ActionButton,
    AreaButton,
    Label 
} from './styles';

import { AntDesign } from '@expo/vector-icons'

export default function Actions(){
    return(
        <Container horizontal={true} showsHorizontalScrollIndicator={false}>
            <ActionButton>
                <AreaButton>
                    <AntDesign name='addfolder' size={26} color='#000' />
                </AreaButton>
                <Label>Entradas</Label>
            </ActionButton>
            <ActionButton>
                <AreaButton>
                    <AntDesign name='tagso' size={26} color='#000' />
                </AreaButton>
                <Label>Compras</Label>
            </ActionButton>
            <ActionButton>
                <AreaButton>
                    <AntDesign name='creditcard' size={26} color='#000' />
                </AreaButton>
                <Label>Carteira</Label>
            </ActionButton>
            <ActionButton>
                <AreaButton>
                    <AntDesign name='barcode' size={26} color='#000' />
                </AreaButton>
                <Label>Boletos</Label>
            </ActionButton>
            <ActionButton>
                <AreaButton>
                    <AntDesign name='setting' size={26} color='#000' />
                </AreaButton>
                <Label>Conta</Label>
            </ActionButton>
        </Container>
    );
}