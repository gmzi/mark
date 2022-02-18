import React from 'react';
import Source from '../helpers/source';
import openLink from '../helpers/openLink';

export default function StockLinkList({ stockTicker, remove }) {

    // IMPLEMENT getServerSideProps OR useSWR to fetch the values from mark_server api, 
    // and that nice Source class to provide the links.
    // THEN find an ordered and nice table render, one left column for keys and several column for values  

    const ticker = stockTicker.toUpperCase();

    const source = new Source(ticker)

    const handleClick = (e) => {
        e.preventDefault()
        const prop = e.target.id;
        openLink(prop, source, ticker)
    }

    const handleClose = () => {
        remove('stock', stockTicker)
    }

    return (
        <div className="container">
            <div className="ticker-and-btn">
                <span className="stockSpan">{ticker}</span>
                <button onClick={handleClose}>X</button>
            </div>
            <ul>
                <li><button onClick={handleClick} id="eps">{source.eps().title}</button></li>
                <li><button onClick={handleClick} id="balance_sheet">{source.balance_sheet().title}</button></li>
                <li><button onClick={handleClick} id="income_statement">{source.income_statement().title}</button></li>
                <li><button onClick={handleClick} id="cash_flow">{source.cash_flow().title}</button></li>
                <li><button onClick={handleClick} id="sec_fillings">{source.sec_fillings().title}</button></li>
            </ul>
        </div>
    )

}



