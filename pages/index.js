import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import StockLinkList from '../components/StockLinkList';
import EtfLinkList from '../components/EtfLinkList';

export default function Home() {
  const initialState = {
    stockTicker: '',
    etfTicker: '',
  }

  const [formData, setFormData] = useState(initialState)
  const [stockTickers, setStockTickers] = useState([])
  const [etfTickers, setEtfTickers] = useState([])

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value
    }))
  }

  useEffect(() => {
  }, [formData])

  const handleClearSearch = () => {
    setFormData(() => (initialState))
  }

  function isDuplicate(array, value) {
    if ([...array].includes(value)) {
      alert('already displayed')
      return true;
    }
    return;
  }

  const handleSubmit = (e) => {
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
      return;
    }
  }

  const stockList = stockTickers.map((s, i) => <StockLinkList key={`${i}-${s}`} stockTicker={s} remove={remove} />)
  const etfList = etfTickers.map((e, i) => <EtfLinkList key={`${i}-${e}`} etfTicker={e} remove={remove} />)

  return (
    <div className={styles.container}>
      <Head>
        <title>Mark</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Mark</h1>
        <form onChange={handleChange} onSubmit={handleSubmit}>
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
          <hr className="divider"></hr>
        ) : null}
        <div className={styles.grid}>
          {etfList}
        </div>
      </main >

      <footer className={styles.footer}>
        <a
          href="gastonmazieres.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          made by{' '}
          <span className={styles.logo}>
            gmzi
          </span>
        </a>
      </footer>
    </div >
  )
}
