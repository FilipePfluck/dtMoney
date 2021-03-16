import React from 'react'

import Summary from '../Summary'
import TransactionsTable from '../TransactionTable'

import * as S from './styles'

const Dashboard = () => {
    return( 
        <S.Container>
            <Summary/>
            <TransactionsTable/>
        </S.Container>
    )
}

export default Dashboard