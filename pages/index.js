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
  const [links, setLinks] = useState()

  const handleChange = async (e) => {
    const { name, value } = e.target;
    // console.log('input id', e.target.id)
    // console.log('value', e.target.value)
    setFormData((data) => ({
      ...data,
      [name]: value
    }))
  }

  useEffect(() => {
  }, [formData])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const symbol = formData.etfTicker
  //   setLinks({ symbol: symbol, data: [dividendsLast16, dividendsLast10, totalReturns10Y] })
  // window.open(dividendsLast10.url)
  // }

  const handleClearSearch = () => {
    setFormData(() => (initialState))
    setLinks(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>McMarket</title>
        <meta name="description" content="financial data links" />
        <link rel="icon" href="/favicon4.ico" />
      </Head>

      <main className={styles.main}>
        <h1>McMarket</h1>
        <div className={styles.grid}>
          <form onChange={handleChange}>
            <label htmlFor="stockTicker" />
            <input id="stockTicker" type="text" name="stockTicker" placeholder="Stock ticker" value={formData.stockTicker} onChange={handleChange} />
            <label htmlFor="etfTicker" />
            <input id="etfTicker" type="text" name="etfTicker" placeholder="ETF ticker" value={formData.etfTicker} onChange={handleChange} />
            <button type="button" onClick={handleClearSearch}>Clear</button>
          </form >
          {formData.stockTicker !== '' ? (
            <StockLinkList stockTicker={formData.stockTicker} />
          ) : null}
          {formData.etfTicker !== '' ? (
            <EtfLinkList etfTicker={formData.etfTicker} />
          ) : null}
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
