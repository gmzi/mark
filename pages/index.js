import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import Layout from '../components/layout'
import Table from '../components/Table';
import Autocomplete from '../components/autocomplete';
import {isDuplicate, dataRequest} from '../lib/helpers';



const SERVER_CLASS = process.env.NEXT_PUBLIC_SERVER_CLASS;
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


  const makeRequest = async (ticker) => {

    const response = await fetch(`${SERVER_CLASS}${ticker}`).then(async(res) => res.json());

    if(response.error){
      alert("that's not found")
      setLoading(false)
      return
    }

    if(response.asset_class === 'ETFs'){
      if (isDuplicate(etfTickers, ticker)) {
        alert('already displayed')
        return;
      }
      const newTickers = [...etfTickers, ticker]
      setEtfTickers(newTickers)
      await dataRequest('etf', ticker, etfData, setEtfData, setLoading)
      } else if (response.asset_class === 'Mutual Funds') {
        if (isDuplicate(MFTickers, ticker)) {
          alert('already displayed')
          return;
        }
        const newTickers = [...MFTickers, ticker]
        setMFTickers(newTickers)
        await dataRequest("mf", ticker, MFData, setMFData, setLoading)
      } else if (response.asset_class === 'Stocks') {
        if (isDuplicate(stockTickers, ticker)) {
          alert('already displayed')
          return;
        }
        const newTickers = [...stockTickers, ticker]
        setStockTickers(newTickers)
        await dataRequest("stock", ticker, stockData, setStockData, setLoading)
      }
      return;
  }

  async function dataRequest(asset_class, ticker, stateData, setStateData){
    const res = await fetch(`${SERVER}/${asset_class}/${ticker}`)
        if (res.ok){
          const result = await res.json();
          const newData = [...stateData, result]
          setStateData(newData)
        } else {
          alert("that's not found")
          remove(asset_class, ticker)
        }
        setLoading(false)
        return
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
      <Autocomplete input={input} setInput={setInput} makeRequest={makeRequest} setLoading={setLoading}/>      
      {loading &&
          <div>
            <p>Fetching data...</p>
          </div>
      }
      <Table etfTickers={etfTickers} etfData={etfData} MFTickers={MFTickers} MFData={MFData} stockTickers={stockTickers} stockData={stockData} loading={loading} remove={remove}/>
    </Layout>
  )
}