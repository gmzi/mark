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

  const handleClearSearch = () => {
    setFormData(() => (initialState))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Mark</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Mark</h1>
        <h2>Stocks</h2>
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
          {formData.stockTicker !== '' ? (
            <StockLinkList stockTicker={formData.stockTicker} />
          ) : null}
        </div>
        {formData.stockTicker !== "" && formData.etfTicker !== '' ? (
          <hr className="divider"></hr>
        ) : null}
        <div className={styles.grid}>
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
