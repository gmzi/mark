import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'
import openLink from '../helpers/openLink';
import useSWR from 'swr'

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
});

export default function TableBody({ etfTicker }) {

    const { data, error } = useSWR(`${SERVER}/etf?ticker=${etfTicker}`, fetcher)

    if (error) {
        return null
    }
    if (!data) return <h1>loading</h1>

    if (data) {
        console.log(data)
    }

    // TODO: MAKE TABLE LAYOUT, MAYBE WITH TABLE NAMES IN HOME AND TABLE DATA FROM HERE, 
    // OR EVERYTHING FROM HERE. MAKE A NICE TABLE TO PUT ETFS SIDE BY SIDE WITH ONLY 
    // ONE ROW NAME IN THE LEFT AND ALL VALUES RIGHT.

    return (
        <>
            <tr>
                <td>Turnover</td>
                {turnoverList}
            </tr>
            <tr>
                <td>Expense Ratio</td>
                {expenseList}
            </tr>
            <tr>
                <td>Net assets</td>
            </tr>
        </>

    )
}

