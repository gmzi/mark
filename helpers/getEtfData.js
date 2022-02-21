import React from 'react';
import Source from '../helpers/source';
import styles from '../styles/Home.module.css'
import openLink from '../helpers/openLink';
import useSWR from 'swr'

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
});

async function getEtfData(etfTicker) {
    // const { data, error } = useSWR(`${SERVER}/etf?ticker=${etfTicker}`, fetcher)
    const res = await fetch(`${SERVER}/etf?ticker=${etfTicker}`)
    const result = await res.json();
    return result;
}


export { getEtfData };
