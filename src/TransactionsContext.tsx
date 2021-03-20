import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'


interface Transaction {
    id: number;
    title: string;
    category: string;
    amount: number;
    type: string;
    createdAt: string;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

export const TransactionsContext = createContext<Transaction[]>([])

export function TransactionsProvider(props: TransactionsProviderProps) {
    
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('/transactions')
        .then(response => setTransactions(response.data.transactions))
    }, [])

    return (
        <TransactionsContext.Provider value={transactions}>
            {props.children}
        </TransactionsContext.Provider>
    )
}