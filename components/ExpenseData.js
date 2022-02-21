import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'
import openLink from '../helpers/openLink';
import useSWR from 'swr'

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
});

export default function ExpenseData({ etfTicker }) {

    const { data, error } = useSWR(`${SERVER}/etf?ticker=${etfTicker}`, fetcher)

    if (error) {
        return null
    }
    if (!data) return <h1>loading</h1>

    if (data) {
        console.log(data)
    }

    return (
        <td>
            {data.expense_ratio}
        </td>

    )
}

