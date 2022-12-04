import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function account_db(account) {
    const data = [{ value: 25, ticker: 'us dollar', bull: 0, bear: 0, key: '1' },
    { value: 80, ticker: 'str 1', bull: 25, bear: 75, key: '2' },
    { value: 90, ticker: 'strategy 2', bull: 15, bear: 85, key: '3' },
    { value: 50, ticker: 'se a as', bull: 55, bear: 45, key: '4' },
    ]
    const values = [1, 2, 3, 4]
    const tickers = ['sa', 'as', 'ass', 'saa']
    const wealth = data.reduce((a, v) => x = a + v.value, 0)
    const return_t = -23.21
    const cups = [123, 321, 246, 135]
    const cash_pct = data[0]['value'] / wealth
    const bull_pct = ''
    return ({
        values: values,
        tickers: tickers,
        wealth: wealth,
        return_t: return_t,
        data: data
    }
    )
}