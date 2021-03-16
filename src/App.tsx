import React, {useState, useCallback} from 'react';

import Modal from 'react-modal'

import GlobalStyle from './styles/global'

import Header from './components/Header'
import Dashboard from './components/Dashboard'
import NewTransactionModal from './components/NewTransactionModal'

import { TransactionProvider } from './contexts/TransactionsContext'

Modal.setAppElement("#root")

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

    const openNewTransactionModal = useCallback(()=>{
        setIsNewTransactionModalOpen(true)
    },[])

    const closeNewTransactionModal = useCallback(()=>{
        setIsNewTransactionModalOpen(false)
    },[])

  return (
    <TransactionProvider>
      <GlobalStyle/>
      <Header openNewTransactionModal={openNewTransactionModal}/>
      <Dashboard/>
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        closeFunction={closeNewTransactionModal}
      />
    </TransactionProvider>
  );
}

export default App;
