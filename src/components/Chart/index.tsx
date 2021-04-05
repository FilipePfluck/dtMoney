import { useCallback, useEffect, useState } from 'react'

import { UseTransaction } from '../../contexts/TransactionsContext'

import { isBefore, eachDayOfInterval, isSameDay } from 'date-fns'

import ApexChart from 'react-apexcharts'

import * as S from './styles'

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

interface ChartItem {
    x: Date
    y: number
}

const Chart = () => {
    const { transactions } = UseTransaction()

    const sortTransactionsByDay = useCallback((a,b)=>{
        const aDate = new Date(a.createdAt)
        const bDate = new Date(b.createdAt)

        if(isBefore(aDate, bDate)){
            return -1
        }

        if(isBefore(bDate, aDate)){
            return 1
        }

        return 0
    },[])

    const [chartData, setChartData] = useState<ChartItem[]>([])
    
    const options = {

        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enable: false
            },
            foreColor: '#989898'
        },
        grid: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            custom: function({series, seriesIndex, dataPointIndex, w}: any) {
              return (
                '<div style="padding: 16px; border-radius: 4px; background-color: #2D3138; border: 0">' +
                '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
                '</div>'
              )
            },
            marker: {
                show: false
            }
        },

        stroke: {
            colors: ['#33CD95']
        },
        xaxis: {
            type: 'datetime',
            axisBorder: {
                color: '#A9A9A9'
            },
            axisTicks: {
                color: '#A9A9A9'
            },

        },
        yAxis:{
            min: 0
        },
        fill: {
            opacity: 0.3,
            type: 'gradient',
            gradient: {
                shade: 'dark',
                opacityFrom: 0.7,
                opacityTo: 0.3,
            },
            colors: ['#33CD95']
        }
    }

    const series = [
        { name: 'Saldo em função do tempo', data: chartData}
    ]

    useEffect(()=>{
        if(!transactions[0]){
            return
        }

        const transactionsByDay = [...transactions].sort(sortTransactionsByDay)

        const allDays = eachDayOfInterval({
            start: new Date(transactionsByDay[0].createdAt),
            end: new Date(transactionsByDay[transactions.length - 1].createdAt)
        })

        let sum = 0;

        //Retorna um valor para cada dia
        const serializedChartData = allDays.map(day => {
            //Procura as transações no dia
            const transactionsInDay = transactions.filter(transaction=>{
                const transactionDate = new Date(transaction.createdAt)

                return isSameDay(day, transactionDate)
            })

            //Se não houver retorna o valor que já tinha
            if(!transactionsInDay[0]){
                return {
                    x: day,
                    y: sum
                }
            }

            //Soma o valor das transações do dia
            const value = transactionsInDay.reduce((acc, transaction) => {
                if(transaction.type === 'deposit'){
                    return acc + transaction.amount
                }else{
                    return acc - transaction.amount
                }
            }, sum)

            sum = value

            return {
                x: day,
                y: value
            }
        })

        setChartData(serializedChartData)
    },[transactions])

    return(
        <S.Container>
            <ApexChart
                type="area" 
                height="100%" 
                options={options} 
                series={series}
            />
        </S.Container>
    )
}

export default Chart