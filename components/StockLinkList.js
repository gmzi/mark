import React from 'react';
import Source from '../helpers/source';
import openLink from '../helpers/functions';

export default function StockLinkList({ stockTicker }) {

    const ticker = stockTicker.toUpperCase();

    const source = new Source(ticker)

    const handleClick = (e) => {
        const prop = e.target.id;
        openLink(prop, source, ticker)
    }

    return (
        <>
            <p>Links for Stock ticker <span>{ticker}</span></p>
            <h5>Summary</h5>
            <ul>
                <li><button onClick={handleClick} id="eps">{source.eps().title}</button></li>
            </ul>
            <h5>Financials</h5>
            <ul>
                <li><button onClick={handleClick} id="balance_sheet">{source.balance_sheet().title}</button></li>
                <li><button onClick={handleClick} id="income_statement">{source.income_statement().title}</button></li>
                <li><button onClick={handleClick} id="cash_flow">{source.cash_flow().title}</button></li>
                <li><button onClick={handleClick} id="sec_fillings">{source.sec_fillings().title}</button></li>
            </ul>
        </>
    )

}



