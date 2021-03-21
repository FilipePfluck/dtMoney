import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'

import App from './App';

createServer({
  models: {
    transaction: Model
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freela',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-03-12 00:00:00')
        },
        {
          id: 3,
          title: 'Burro do Shrek',
          type: 'deposit',
          category: 'Vendas',
          amount: 1000,
          createdAt: new Date('2021-03-15 00:00:00')
        },
        {
          id: 2,
          title: 'Supermercado',
          type: 'withdraw',
          category: 'Compras básicas',
          amount: 200,
          createdAt: new Date('2021-03-14 00:00:00')
        },
        {
          id: 4,
          title: 'Renda do aplicativo',
          type: 'deposit',
          category: 'Dev',
          amount: 4000,
          createdAt: new Date('2021-03-20 00:00:00')
        },
        {
          id: 7,
          title: 'Freela',
          type: 'deposit',
          category: 'Dev',
          amount: 600,
          createdAt: new Date('2021-03-21 00:00:00')
        },
        {
          id: 5,
          title: 'Churrasco',
          type: 'withdraw',
          category: 'Família',
          amount: 200,
          createdAt: new Date('2021-03-21 00:00:00')
        },
        {
          id: 6,
          title: 'Patinete motorizado',
          type: 'withdraw',
          category: 'compras',
          amount: 2000,
          createdAt: new Date('2021-03-21 00:00:00')
        },
        
      ]
    })
  },

  routes(){
    this.namespace = 'api'

    this.get('/transactions', ()=>{
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request)=>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);