import React from 'react'

import Summary from '../Summary'
import TransactionsTable from '../TransactionTable'
import Chart from '../Chart'

import * as S from './styles'

const Dashboard = () => {
    return( 
        <S.Container>
            <Summary/>
            <Chart/>
            <TransactionsTable/>
        </S.Container>
    )
}

export default Dashboard