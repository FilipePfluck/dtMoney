import { useCallback, useEffect, useState } from 'react'

import { UseTransaction } from '../../contexts/TransactionsContext'

import {create, color, Scrollbar} from "@amcharts/amcharts4/core"
import {LineSeries, DateAxis, ValueAxis, XYChart, CircleBullet, XYCursor} from "@amcharts/amcharts4/charts"

import { isBefore, eachDayOfInterval, isEqual, isSameDay } from 'date-fns'


import * as S from './styles'

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

interface CartItemsAmount {
    [key: number]: number;
  }

interface ChartItem {
    Date: Date
    Balance: number
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
                    "Date": day,
                    "Balance": sum
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
                "Date": day,
                "Balance": value
            }
        })

        setChartData(serializedChartData)
    },[transactions])

    let chart = create("chartdiv", XYChart)
    
    chart.dateFormatter.inputDateFormat = "i"
    //A linha acima faz o grafico entender o formato 2020-06-20T22:14:28.007Z 
    //mais informações em: https://www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/

    chart.data = chartData
    
    let dateAxis = chart.xAxes.push(new DateAxis())
    dateAxis.baseInterval = {
        "timeUnit": "day",
        "count": 1
    }

    let valueAxis = chart.yAxes.push(new ValueAxis())
    
    let series = chart.series.push(new LineSeries())
        
    series.dataFields.dateX = "Date"
    series.dataFields.valueY = "Balance"

    let bullet = series.bullets.push(new CircleBullet())
    series.strokeWidth = 2
    series.stroke = color("#33CD95")
    series.fill = color("#33CD95")

    chart.stroke = color("#cdcdcd")
    chart.fill = color("#cdcdcd")
    chart.strokeWidth = 1.75
    
    series.dataFields.dateX = "Date"
    series.dataFields.valueY = "Balance"

    bullet.tooltipText = "Saldo: {Balance} \n Data: {Date}"
        
    chart.cursor = new XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;

    //chart.scrollbarX = new Scrollbar();

    return(
        <S.Container id="chartdiv"/>
    )
}

export default Chart