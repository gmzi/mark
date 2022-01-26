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
            <div>
                <span className="etfSpan">{ticker}</span>
            </div>
            <ul>
                <li><button onClick={handleClick} id="totalReturns10Y">{source.totalReturns10Y().title}</button></li>
                <li><button onClick={handleClick} id={'dividendsLast10'}>{source.dividendsLast10().title}</button></li>
                <li><button onClick={handleClick} id="dividendsLast16">{source.dividendsLast16().title}</button></li>
            </ul>
        </>
    )

}