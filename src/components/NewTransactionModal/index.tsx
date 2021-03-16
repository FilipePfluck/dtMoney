import React, {useCallback, useState} from 'react'
import Modal from 'react-modal'

import { UseTransaction } from '../../contexts/TransactionsContext'

import IncomeIcon from '../../assets/income.svg'
import OutcomeIcon from '../../assets/outcome.svg'
import Close from '../../assets/close.svg'

import * as S from './styles'

interface ModalProps {
    isOpen: boolean
    closeFunction: () => void
}

const NewTransactionModal: React.FC<ModalProps> = ({isOpen, closeFunction}) => { 
    const [title, setTitle] = useState('')
    const [amount, setAmount] = useState(0)
    const [category, setCategory] = useState('')
    const [type, setType] = useState<'deposit' | 'withdraw'>('deposit')
    
    const { createTransaction } = UseTransaction()

    const handleCreateNewTransaction = useCallback(async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
        await createTransaction({
            title, 
            amount, 
            category, 
            type
        })

        setTitle('')
        setAmount(0)
        setCategory('')
        setType('deposit')

        closeFunction()
    },[title, amount, category, type, closeFunction, createTransaction])

    return(
        <S.Container onSubmit={handleCreateNewTransaction}>
            <Modal 
                isOpen={isOpen}
                onRequestClose={closeFunction}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <S.Container>
                    <S.CloseButton 
                        type="button"
                        onClick={closeFunction}
                    >
                        <img src={Close} alt="Fechar botão"/>
                    </S.CloseButton>

                    <h2>Cadastrar transações</h2>

                    <input 
                        type="text"
                        placeholder="Título"
                        value={title}
                        onChange={(e)=>{setTitle(e.target.value)}}
                    />
                    <input 
                        type="number"
                        placeholder="Valor"
                        value={amount}
                        onChange={(e)=>{setAmount(Number(e.target.value))}}
                    /> 

                    <S.TransactionTypeContainer type={type}>
                        <button 
                            type="button"
                            id="deposit"
                            onClick={()=>setType('deposit')}
                        >
                            <img src={IncomeIcon} alt="entradas"/>
                            <span>Entrada</span>
                        </button>
                        <button
                            type="button"
                            id='withdraw'
                            onClick={()=>setType('withdraw')}
                        >
                            <img src={OutcomeIcon} alt="entradas"/>
                            <span>Saída</span>
                        </button>
                    </S.TransactionTypeContainer>

                    <input 
                        type="text"
                        placeholder="Categoria"
                        value={category}
                        onChange={(e)=>{setCategory(e.target.value)}}
                    />

                    <button type="submit">
                        Cadastrar
                    </button>
                </S.Container>
            </Modal>
        </S.Container>
    )
}

export default NewTransactionModal