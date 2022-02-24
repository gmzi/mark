import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import StockLinkList from '../components/StockLinkList';
import EtfLinkList from '../components/EtfLinkList';
import EtfTable from '../components/EtfTable';
import Layout from '../components/layout';
import TableHead from '../components/TableHead';
import TableData from '../components/TableData';
import NestedTable from '../components/NestedTable';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Stocks() {
    const initialState = {
        stockTicker: '',
    }
    const [formData, setFormData] = useState(initialState)
    const [stockTickers, setStockTickers] = useState([])
    const [allStockData, setAllStockData] = useState([])

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }))
    }

    const handleClearSearch = () => {
        setFormData(() => (initialState))
    }

    useEffect(() => {
    }, [allStockData])

    function isDuplicate(array, value) {
        if ([...array].includes(value)) {
            return true;
        }
        return;
    }

    function addStock(prevState, newData) {
        const newTickers = [...prevState, newData]
        setStockTickers(newTickers)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // ---------------------------------------------------------------
        // STOCKS
        if (formData.stockTicker !== '') {
            if (isDuplicate(stockTickers, formData.stockTicker)) {
                alert('already displayed')
                const newFormState = { stockTicker: '', etfTicker: formData.etfTicker }
                setFormData(() => newFormState)
                return;
            }
            addStock(stockTickers, formData.stockTicker)

            // SEND REQUEST TO API
            const res = await fetch(`${SERVER}/stock?ticker=${formData.stockTicker}`)
            if (res.ok) {
                const result = await res.json();
                const newData = [...allStockData, result]
                setAllStockData(newData)
                setFormData(() => (initialState))
            } else {
                alert("that's not found")
                remove('stock', formData.stockTicker)
                setFormData(() => (initialState))
            }
        }
    }

    const remove = (list, ticker) => {
        if (list === 'stock') {
            const removedArr = [...stockTickers].filter((s) => s !== ticker)
            setStockTickers(removedArr)
            const removedData = [...allStockData].filter((obj) => obj.symbol !== ticker)
            setAllStockData(removedData)
            return;
        }
        if (list === 'etf') {
            const removedArr = [...etfTickers].filter((e) => e !== ticker)
            setEtfTickers(removedArr)
            const removedData = [...allData].filter((obj) => obj.symbol !== ticker)
            setAllData(removedData)
            return;
        }
    }
    const stockList = stockTickers.map((s, i) => <StockLinkList key={`${i}-${s}`} stockTicker={s} remove={remove} />)
    const tableHeadListStock = stockTickers.map((e, i) => <TableHead key={`${i}-${e}`} stockTicker={e} remove={remove} />)
    const priceListStock = allStockData.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
    const epsList = allStockData.map((obj, i) => <TableData key={`${i}-${obj.eps}`} data={obj.eps} />)
    const peList = allStockData.map((obj, i) => <TableData key={`${i}-${obj.p_e}`} data={obj.p_e} />)
    const mktCapList = allStockData.map((obj, i) => <TableData key={`${i}-${obj.market_cap}`} data={obj.market_cap} />)
    const betaListStock = allStockData.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
    const dividendListStock = allStockData.map((obj, i) => <TableData key={`${i}-${obj.dividend}`} data={obj.dividend} />)
    const dividendYieldListStock = allStockData.map((obj, i) => <TableData key={`${i}-${obj.dividend_yield}`} data={obj.dividend_yield} />)
    const weekHighList = allStockData.map((obj, i) => <TableData key={`${i}-${obj.week_high}`} data={obj.week_high} />)
    const weekLowList = allStockData.map((obj, i) => <TableData key={`${i}-${obj.week_low}`} data={obj.week_low} />)

    return (
        <Layout>
            <Head>
                <title>Mark/stocks</title>
                <link rel="icon" href="/favicon4.ico" />
            </Head>
            <h1 className={styles.h1}>Mark/stocks</h1>
            <form className={styles.form} onChange={handleChange} onSubmit={handleSubmit}>
                <label htmlFor="stockTicker" />
                <input id="stockTicker" type="text" name="stockTicker" placeholder="enter STOCK ticker" value={formData.stockTicker} onChange={handleChange} />
                <div>
                    <input type="submit" className={styles.button}></input>
                    <button onClick={handleClearSearch} className={styles.button}>clear</button>
                </div>
            </form >

            <div className={styles.grid}>
                {/* {stockList} */}
                {stockTickers.length ? (
                    <table className={styles.table}>
                        <thead className={`${styles.tHead} ${styles.stockHead}`}>
                            <tr>
                                <th className={styles.th}></th>
                                {tableHeadListStock}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Price $</td>
                                {priceListStock}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>EPS(TTM)</td>
                                {epsList}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>P/E(TTM)</td>
                                {peList}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Dividend</td>
                                {dividendListStock}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Dividend Yield</td>
                                {dividendYieldListStock}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>52 W High</td>
                                {weekHighList}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>52 W Low</td>
                                {weekLowList}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Market Cap</td>
                                {mktCapList}
                            </tr>
                            <tr>
                                <td className={`${styles.td} ${styles.rowTitle}`}>Beta</td>
                                {betaListStock}
                            </tr>
                        </tbody>
                    </table>
                ) : null}
            </div>
        </Layout>
    )
}
