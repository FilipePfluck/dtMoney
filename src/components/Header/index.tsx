import React from 'react'

import Logo from '../../assets/logo.svg'

import * as S from './styles'

interface Props {
    openNewTransactionModal: ()=> void
}

const Header: React.FC<Props> = ({openNewTransactionModal}) => {
    

    return(
        <S.Container>
            <S.Content>
                <img src={Logo} alt="dt money"/>
                <button type="button" onClick={openNewTransactionModal}>
                    Nova transação
                </button>
                
            </S.Content>
        </S.Container>
    )
}

export default Header