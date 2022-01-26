import React from 'react';
import Source from '../helpers/source';
import openLink from '../helpers/functions';

export default function EtfLinksList({ etfTicker }) {

    const ticker = etfTicker.toUpperCase();

    const source = new Source(ticker)

    const handleClick = (e) => {
        const prop = e.target.id;
        openLink(prop, source, ticker)
    }

    return (
        <>
            <p>Links for ETF ticker <span>{ticker}</span></p>
            <ul>
                <button onClick={handleClick} id={'dividendsLast10'}>{source.dividendsLast10().title}</button>
                <button onClick={handleClick} id="totalReturns10Y">{source.totalReturns10Y().title}</button>
                <button onClick={handleClick} id="dividendsLast16">{source.dividendsLast16().title}</button>
            </ul>
        </>
    )

}