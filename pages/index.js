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
  const [stockTickers, setStockTickers] = useState([])
  const [etfTickers, setEtfTickers] = useState([])
  const [allData, setAllData] = useState([])
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
  }, [allData])

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

  function addEtf(prevState, newData) {
    const newTickers = [...prevState, newData]
    setEtfTickers(newTickers)
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

    // ---------------------------------------------------------------
    // ETFS
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
  const stockList = stockTickers.map((s, i) => <StockLinkList key={`${i}-${s}`} stockTicker={s} remove={remove} />)
  // const etfList = etfTickers.map((e, i) => <EtfLinkList key={`${i}-${e}`} etfTicker={e} remove={remove} />)
  // const etfList = etfTickers.map((e, i) => <EtfTable key={`${i}-${e}`} etfTicker={e} remove={remove} />)
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


  const tableHeadList = etfTickers.map((e, i) => <TableHead key={`${i}-${e}`} etfTicker={e} remove={remove} />)
  // const turnoverList = etfTickers.map((e, i) => <TurnoverData key={`${i}-${e}`} ticker={e} />)
  // const expenseList = etfTickers.map((e, i) => <ExpenseData key={`${i}-${e}`} ticker={e} />)
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

        {stockList.length && etfTickers.length ? (
          <hr className={styles.divider}></hr>
        ) : null}

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
      </main >
      <footer>
        made by
        <a
          href="https://github.com/gmzi/mcmarket"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={styles.logo}>
            me
          </span>
        </a>
      </footer>
    </div >
  )
}
