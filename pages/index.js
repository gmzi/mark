import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import StockLinkList from '../components/StockLinkList';
import EtfLinkList from '../components/EtfLinkList';
import EtfTable from '../components/EtfTable';
import TableHead from '../components/TableHead';
import TableData from '../components/TableData';
import NestedTable from '../components/NestedTable';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function Home() {
  const initialState = {
    stockTicker: '',
    etfTicker: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [stockTickers, setStockTickers] = useState([])
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
      alert('already displayed')
      return true;
    }
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.stockTicker !== '') {
      if (isDuplicate(stockTickers, formData.stockTicker)) {
        const newFormState = { stockTicker: '', etfTicker: formData.etfTicker }
        setFormData(() => newFormState)
        return;
      }
      const newTickers = [...stockTickers, formData.stockTicker]
      setStockTickers(newTickers)
    }
    if (formData.etfTicker !== '') {
      if (isDuplicate(etfTickers, formData.etfTicker)) {
        const newFormState = { stockTicker: formData.stockTicker, etfTicker: '' }
        setFormData(() => newFormState)
        return;
      }
      const newTickers = [...etfTickers, formData.etfTicker]
      setEtfTickers(newTickers)

      const res = await fetch(`${SERVER}/etf?ticker=${formData.etfTicker}`)
      const result = await res.json();
      const newData = [...allData, result]
      setAllData(newData)
    }
    setFormData(() => (initialState))
    return;
  }

  const remove = (list, ticker) => {
    if (list === 'stock') {
      const removedArr = [...stockTickers].filter((s) => s !== ticker)
      setStockTickers(removedArr)
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
  // const etfList = etfTickers.map((e, i) => <EtfLinkList key={`${i}-${e}`} etfTicker={e} remove={remove} />)
  // const etfList = etfTickers.map((e, i) => <EtfTable key={`${i}-${e}`} etfTicker={e} remove={remove} />)
  const tableHeadList = etfTickers.map((e, i) => <TableHead key={`${i}-${e}`} etfTicker={e} remove={remove} />)
  // const turnoverList = etfTickers.map((e, i) => <TurnoverData key={`${i}-${e}`} etfTicker={e} />)
  // const expenseList = etfTickers.map((e, i) => <ExpenseData key={`${i}-${e}`} etfTicker={e} />)
  const priceList = allData.map((obj, i) => <TableData key={`${i}-${obj.price}`} data={obj.price} />)
  const turnoverList = allData.map((obj, i) => <TableData key={`${i}-${obj.symbol}`} data={obj.turnover_ratio} />)
  const expenseList = allData.map((obj, i) => <TableData key={`${i}-${obj.expense_ratio}`} data={obj.expense_ratio} />)
  const assetList = allData.map((obj, i) => <TableData key={`${i}-${obj.net_assets}`} data={obj.net_assets} />)
  const navList = allData.map((obj, i) => <TableData key={`${i}-${obj.nav}`} data={obj.nav} />)
  const betaList = allData.map((obj, i) => <TableData key={`${i}-${obj.beta}`} data={obj.beta} />)
  const yieldList = allData.map((obj, i) => <TableData key={`${i}-${obj.yield}`} data={obj.yield} />)
  const sectorList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.sector_allocation.slice(0, 5)}`} data={obj.sector_allocation} />)
  const dividendHistoryList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.dividend_payments.slice(0, 5)}`} data={obj.dividend_payments} />)
  const returnHistoryList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.return_history.slice(0, 5)}`} data={obj.return_history} />)
  const top10List = allData.map((obj, i) => <NestedTable key={`${i}-${obj.holdings_10.slice(0, 5)}`} data={obj.holdings_10} />)
  const rankingList = allData.map((obj, i) => <NestedTable key={`${i}-${obj.lipper_ranking.slice(0, 5)}`} data={obj.lipper_ranking} />)

  return (
    <div className={styles.container}>
      <Head>
        <title>Mark</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Mark</h1>
        <form className={styles.form} onChange={handleChange} onSubmit={handleSubmit}>
          <label htmlFor="stockTicker" />
          <input id="stockTicker" type="text" name="stockTicker" placeholder="Stock ticker" value={formData.stockTicker} onChange={handleChange} />
          <label htmlFor="etfTicker" />
          <input id="etfTicker" type="text" name="etfTicker" placeholder="ETF ticker" value={formData.etfTicker} onChange={handleChange} />
          <div>
            <input type="submit"></input>
            <button onClick={handleClearSearch}>clear</button>
          </div>
        </form >
        <div className={styles.grid}>
          {stockList}
        </div>
        {stockList.length && etfList.length ? (
          <hr className={styles.divider}></hr>
        ) : null}
        <div className={styles.grid}>
          {etfTickers.length ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  {tableHeadList}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Price $</td>
                  {priceList}
                </tr>
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
                  {assetList}
                </tr>
                <tr>
                  <td>NAV</td>
                  {navList}
                </tr>
                <tr>
                  <td>Beta</td>
                  {betaList}
                </tr>
                <tr>
                  <td>Yield</td>
                  {yieldList}
                </tr>
                <tr>
                  <td>Sector Allocation</td>
                  {sectorList}
                </tr>
                <tr>
                  <td>Top 10 holdings</td>
                  {top10List}
                </tr>
                <tr>
                  <td>Dividend History</td>
                  {dividendHistoryList}
                </tr>
                <tr>
                  <td>Return History</td>
                  {returnHistoryList}
                </tr>
                <tr>
                  <td>YTD Lipper Ranking</td>
                  {rankingList}
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
      </main >

      {/* <footer className={styles.footer}>
        <a
          href="https://github.com/gmzi/mcmarket"
          target="_blank"
          rel="noopener noreferrer"
        >
          made by{' '}
          <span className={styles.logo}>
            gmzi
          </span>
        </a>
      </footer> */}
    </div >
  )
}
