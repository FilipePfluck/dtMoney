import {createContext, useEffect, useState, useCallback, useContext} from 'react'

import api from '../services/api'

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

interface CreateTransaction { 
    title: string,
    amount: number,
    category: string,
    type: string
}

interface ContextValue {
    transactions: Transaction[],
    createTransaction: (transaction: CreateTransaction) => Promise<void>
}

const TransactionsContext = createContext({} as ContextValue)

export const TransactionProvider: React.FC = ({children}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const createTransaction = useCallback(async(transactionData: CreateTransaction)=>{
        const response = await api.post('/transactions', {
            ...transactionData,
            createdAt: Date.now()
        })
        const { transaction } = response.data

        setTransactions(state => [...state, transaction])
    },[])

    useEffect(()=>{
        api.get('/transactions').then(response => {
            setTransactions(response.data.transactions)
        })
    },[])

    const value = {
        transactions,
        createTransaction
    }

    return(
        <TransactionsContext.Provider value={value}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function UseTransaction(){
    const context = useContext(TransactionsContext)

    return context
}