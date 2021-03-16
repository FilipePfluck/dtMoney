import React, { useMemo } from 'react'

import { UseTransaction } from '../../contexts/TransactionsContext'

import IncomeIcon from '../../assets/income.svg'
import OutcomeIcon from '../../assets/outcome.svg'
import TotalIcon from '../../assets/total.svg'

import * as S from './styles'

const Summary = () => {
    const { transactions } = UseTransaction()

    const summary = useMemo(()=>{
        return transactions.reduce((acc, transaction) => {
            if(transaction.type === 'deposit') {
                acc.deposits += transaction.amount
                acc.total += transaction.amount
            } else{
                acc.withdraws += transaction.amount 
                acc.total -= transaction.amount
            }

            return acc
        }, {
            deposits: 0,
            withdraws: 0,
            total: 0
        })
    },[transactions])

    return(
        <S.Container>
            <div>
                <header>
                    Entradas
                    <img src={IncomeIcon} alt="entradas"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    Saídas
                    <img src={OutcomeIcon} alt="saídas"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)}
                </strong>
            </div>
            <div className="green">
                <header>
                    Total
                    <img src={TotalIcon} alt="total"/>
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)}
                </strong>
            </div>
        </S.Container>
    )
}

export default Summary