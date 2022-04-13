import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Layout from '../components/layout'
import AutoComplete from '../components/Autocomplete';
import Table from '../components/Table';

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;


export default function Home() {

  const [etfTickers, setEtfTickers] = useState([])
  const [etfData, setEtfData] = useState([])
  const [MFTickers, setMFTickers] = useState([])
  const [MFData, setMFData] = useState([])
  const [stockTickers, setStockTickers] = useState([])
  const [stockData, setStockData] = useState([])
  const [loading, setLoading] = useState()
  const [input, setInput] = useState("")

  // useEffect(() => {
  // }, [etfData])

  // const handleChange = async (e) => {
  //   const { name, value } = e.target;
  //   setFormData((data) => ({
  //     ...data,
  //     [name]: value
  //   }))
  // }

  // const handleClearSearch = () => {
  //   setFormData(() => (initialState))
  // }

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
      // setLoading(true)
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
        // setLoading(true)
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
        // setLoading(true)
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

  const remove = (asset_class, ticker) => {
    if (asset_class === 'stock') {
      const indexOfObject = stockData.findIndex((obj) => obj.symbol === ticker)
      stockData.splice(indexOfObject, 1)
      setStockData(stockData)
      const removedArr = [...stockTickers].filter((e) => e !== ticker)
      setStockTickers(removedArr)
      return;
    }
    if (asset_class === 'etf') {
      const indexOfObject = etfData.findIndex((obj) => obj.symbol === ticker)
      etfData.splice(indexOfObject, 1)
      setEtfData(etfData)
      const removedArr = [...etfTickers].filter((e) => e !== ticker)
      setEtfTickers(removedArr)
      return;
    }
    if (asset_class === 'mf') {
      const indexOfObject = MFData.findIndex((obj) => obj.symbol === ticker)
      MFData.splice(indexOfObject, 1)
      setMFData(MFData)
      const removedArr = [...MFTickers].filter((e) => e !== ticker)
      setMFTickers(removedArr)
      return;
    }
  }

  return (
    <Layout>
      <Head>
        <title>Mark</title>
        <link rel="icon" href="/favicon4.ico" />
      </Head>
      <h1 className={styles.h1}>/mark/</h1>
      <p className={styles.h1}>fund comparison tool</p>
      <AutoComplete input={input} setInput={setInput} makeRequest={makeRequest} setLoading={setLoading}/>
      <Table etfTickers={etfTickers} etfData={etfData} MFTickers={MFTickers} MFData={MFData} stockTickers={stockTickers} stockData={stockData} loading={loading} remove={remove}/>
    </Layout>
  )
}