import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import StockLinkList from '../components/StockLinkList';
import EtfLinkList from '../components/EtfLinkList';
import EtfTable from '../components/EtfTable';
import Layout from '../components/layout'
import TableHead from '../components/TableHead';
import TableData from '../components/TableData';
import NestedTable from '../components/NestedTable';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Home() {
  const initialState = {
    etfTicker: '',
  }

  const dataTemplate = {
    "symbol": "-",
    "price": "-",
    "turnover_ratio": "-",
    "fund_family": "-",
    "expense_ratio": "-",
    "net_assets": "-",
    "yield": "-",
    "nav": "-",
    "legal_type": "-",
    "dividend_history": "-",
    "dividend_last": "-",
    "holdings_10": "-",
    "beta": "-",
    "return_history": "-",
    "sector_allocation": "-",
    "lipper_ranking": "-"
  }

  const [formData, setFormData] = useState(initialState)
  const [etfTickers, setEtfTickers] = useState([])
  const [allData, setAllData] = useState([])

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
  }, [allData])

  function isDuplicate(array, value) {
    if ([...array].includes(value)) {
      return true;
    }
    return;
  }

  function addEtf(prevState, newData) {
    const newTickers = [...prevState, newData]
    setEtfTickers(newTickers)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.etfTicker !== '') {
      if (isDuplicate(etfTickers, formData.etfTicker)) {
        alert('already displayed')
        const newFormState = { stockTicker: formData.stockTicker, etfTicker: '' }
        setFormData(() => newFormState)
        return;
      }
      const newTickers = [...etfTickers, formData.etfTicker]

      // RENDER NEW TICKER IN LIST
      setEtfTickers(newTickers)

      // SEND REQUEST TO API
      const res = await fetch(`${SERVER}/etf?ticker=${formData.etfTicker}`)
      if (res.ok) {
        const result = await res.json();
        dataTemplate = { ...result }
        const newData = [...allData, dataTemplate]
        setAllData(newData)
        setFormData(() => (initialState))
        return
      } else {
        alert("that's not found")
        remove('etf', formData.etfTicker)
        setFormData(() => (initialState))
      }
      // TODO:
      // GUIDE USER INPUT THROGH SUGGESTIONS instead of this deprecated method:

      // CHECK IF USER ENTERED A STOCK TICKER IN ETF INPUT, AND FIX IT, 
      // SAME LOGIC TO BE APPLIED FOR MUTUAL FUNDS AND BONDS.
      // if (!isDuplicate(stockTickers, formData.etfTicker)) {
      //   const stockRes = await fetch(`${SERVER}/stock?ticker=${formData.etfTicker}`)
      //   if (stockRes.ok) {
      //     alert('added to stock')
      //     addStock(stockTickers, formData.etfTicker)
      //     remove('etf', formData.etfTicker)
      //     setFormData(() => (initialState))
      //     return;
      //   }
      //   alert('thats not found')
      //   remove('etf', formData.etfTicker)
      //   setFormData(() => (initialState))
      //   return;
      // }
      // alert('already in stock list')
      // remove('etf', formData.etfTicker)
      // setFormData(() => (initialState))
      // return;
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

  const tableHeadList = etfTickers.map((e, i) => <TableHead key={`${i}-${e}`} etfTicker={e} remove={remove} />)
  const priceList = allData.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
  const turnoverList = allData.map((obj, i) => <TableData key={`${i}-${obj.symbol}`} data={obj.turnover_ratio} />)
  const expenseList = allData.map((obj, i) => <TableData key={`${i}-${obj.expense_ratio}`} data={obj.expense_ratio} />)
  const assetList = allData.map((obj, i) => <TableData key={`${i}-${obj.net_assets}`} data={obj.net_assets} />)
  const navList = allData.map((obj, i) => <TableData key={`${i}-${obj.nav}`} data={obj.nav} />)
  const betaList = allData.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
  const yieldList = allData.map((obj, i) => <TableData key={`${i}-${obj.yield}`} data={obj.yield} />)
  const dividendLastList = allData.map((obj, i) => <TableData key={`${i}-${obj.dividend_last}`} data={obj.dividend_last} />)
  const sectorList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.sector_allocation.slice(0, 5)}`} data={obj.sector_allocation} />)
  const dividendHistoryList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.dividend_history.slice(0, 5)}`} data={obj.dividend_history} />)
  const returnHistoryList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.return_history.slice(0, 5)}`} data={obj.return_history} />)
  const top10List = allData.map((obj, i) => <NestedTable key={`${i}-${obj.holdings_10.slice(0, 5)}`} data={obj.holdings_10} />)
  const rankingList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.lipper_ranking.slice(0, 5)}`} data={obj.lipper_ranking} />)
  const familyList = allData.map((obj, i) => <TableData key={`${i}-${obj.fund_family}`} data={obj.fund_family} />)
  const legalList = allData.map((obj, i) => <TableData key={`${i}-${obj.legal_type}`} data={obj.legal_type} />)


  return (
    <Layout>
      <Head>
        <title>Mark/etfs</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>
      <h1 className={styles.h1}>Mark/etfs</h1>
      <form className={styles.form} onChange={handleChange} onSubmit={handleSubmit}>
        <label htmlFor="etfTicker" />
        <input id="etfTicker" type="text" name="etfTicker" placeholder="enter ETF ticker" value={formData.etfTicker} onChange={handleChange} />
        <div>
          <input type="submit" className={styles.button}></input>
          <button onClick={handleClearSearch} className={styles.button}>clear</button>
        </div>
      </form >
      <div className={styles.grid}>
        {etfTickers.length ? (
          <table className={styles.table}>
            <thead className={`${styles.tHead} ${styles.etfHead}`}>
              <tr>
                <th className={styles.th}></th>
                {tableHeadList}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Price $</td>
                {priceList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Turnover</td>
                {turnoverList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Expense Ratio</td>
                {expenseList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Net assets</td>
                {assetList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>NAV</td>
                {navList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Beta</td>
                {betaList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Yield</td>
                {yieldList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Last Dividend</td>
                {dividendLastList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Dividend History</td>
                {dividendHistoryList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Return History</td>
                {returnHistoryList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Sector Allocation</td>
                {sectorList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Top holdings</td>
                {top10List}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>YTD Lipper Ranking</td>
                {rankingList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Fund Family</td>
                {familyList}
              </tr>
              <tr>
                <td className={`${styles.td} ${styles.rowTitle}`}>Legal Type</td>
                {legalList}
              </tr>
            </tbody>
          </table>
        ) : null}
      </div>
    </Layout>
  )
}
