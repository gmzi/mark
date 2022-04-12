import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Layout from '../components/layout'
import TableHead from '../components/TableHead';
import TableData from '../components/TableData';
import NestedTable from '../components/NestedTable';
import AutoComplete from '../components/autocomplete';
import Etf from '../components/tables/Etf';
import MF from '../components/tables/MF';
import Stock from '../components/tables/Stock';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;


export default function Home() {
  const initialState = {
    tickerInput: '',
  }
  const [formData, setFormData] = useState(initialState)

  const [etfTickers, setEtfTickers] = useState([])
  const [etfData, setEtfData] = useState([])

  const [MFTickers, setMFTickers] = useState([])
  const [MFData, setMFData] = useState([])

  const [stockTickers, setStockTickers] = useState([])
  const [stockData, setStockData] = useState([])

  const [loading, setLoading] = useState()
  const [input, setInput] = useState("")

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
  }, [etfData])

  function isDuplicate(array, value) {
    if ([...array].includes(value)) {
      return true;
    }
    return;
  }

  const makeRequest = async (ticker) => {
    const response = await fetch(`${SERVER}/class/${ticker}`).then(async(res) => res.json())
    if(response.error){
      alert("that's not found")
      return
    }

    if(response.asset_class === 'ETFs'){
      if (isDuplicate(etfTickers, ticker)) {
        alert('already displayed')
        return;
      }
      const newTickers = [...etfTickers, ticker]
      setEtfTickers(newTickers)
      setLoading(true)
      const res = await fetch(`${SERVER}/etf/${ticker}`)
      if (res.ok) {
        const result = await res.json();
        const newData = [...etfData, result]
        setEtfData(newData)
      } else {
        alert("that's not found")
        return
      }
      setLoading(false)

      } else if (response.asset_class === 'Mutual Funds') {
        if (isDuplicate(MFTickers, ticker)) {
          alert('already displayed')
          return;
        }
        const newTickers = [...MFTickers, ticker]
        setMFTickers(newTickers)
        setLoading(true)
        const res = await fetch(`${SERVER}/mutual_fund/${ticker}`)
        if (res.ok){
          const result = await res.json();
          const newData = [...MFData, result]
          setMFData(newData)
        } else {
          alert("that's not found")
          return;
        }
        setLoading(false)

      } else if (response.asset_class === 'Stocks') {
        if (isDuplicate(stockTickers, ticker)) {
          alert('already displayed')
          return;
        }
        const newTickers = [...stockTickers, ticker]
        setStockTickers(newTickers)
        setLoading(true)
        const res = await fetch(`${SERVER}/stock/${ticker}`)
        if (res.ok){
          const result = await res.json();
          const newData = [...stockData, result]
          setStockData(newData)
        } else {
          alert("that's not found")
          return;
        }
        setLoading(false)
      }
      return;
  }

  const remove = (list, ticker) => {
    if (list === 'stock') {
      const removedArr = [...stockTickers].filter((s) => s !== ticker)
      setStockTickers(removedArr)
      const removedData = [...stockData].filter((obj) => obj.symbol !== ticker)
      setStockData(removedData)
      return;
    }
    if (list === 'etf') {
      const removedArr = [...etfTickers].filter((e) => e !== ticker)
      setEtfTickers(removedArr)
      const removedData = [...etfData].filter((obj) => obj.symbol !== ticker)
      setEtfData(removedData)
      return;
    }
    if (list === 'mutualFund') {
      const removedArr = [...MFTickers].filter((e) => e !== ticker)
      setMFTickers(removedArr)
      const removedData = [...MFData].filter((obj) => obj.symbol !== ticker)
      setMFData(removedData)
      return;
    }
  }

  return (
    <Layout>
      <Head>
        <title>Mark</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>
      <h1 className={styles.h1}>/Mark/</h1>
      <AutoComplete input={input} setInput={setInput} makeRequest={makeRequest}/>
      <div className={styles.mainGrid}>
        <Etf etfTickers={etfTickers} data={etfData} loading={loading} remove={remove}/>
        <MF MFTickers={MFTickers} data={MFData} loading={loading} remove={remove}/>
        <Stock stockTickers={stockTickers} data={stockData} loading={loading} remove={remove}/>
      </div>
      {/* <div>
        <span>data scraped from <a href="https://marketwatch.com" target="_blank" rel='noreferrer'>MarketWatch</a> and <a href="https://finance.yahoo.com" target="_blank" rel='noreferrer'>Yahoo Finance</a></span>
      </div> */}
    </Layout>
  )
}
