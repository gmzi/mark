# FINANCIAL METRICS 

## stock screening

url: https://www.cnbc.com/quotes/SYMBOL

- financials:
    - balance sheet (https://www.cnbc.com/quotes/JPM?tab=financials#timePeriod)
    - income statement (https://apps.cnbc.com/view.asp?symbol=JPM&uid=stocks/financials&view=incomeStatement)
        - gross income (total earnings before costs and taxes)
        - net income (sales minus costs of operation, materials and taxes)
    - cash flow statement (https://apps.cnbc.com/view.asp?symbol=JPM&uid=stocks/financials&view=cashFlowStatement)

    - sec fillings (https://apps.cnbc.com/view.asp?symbol=MELI&uid=stocks/sec)

- Earnings Per Share (EPS)
- Average Per share earnings last 10 yrs. (https://www.cnbc.com/quotes/JPM?tab=earnings)
- P/E ratio (stock price / EPS, <10: low, >10<20: moderate, >20: expensive )

- Growth rate of Earnings per Share (https://www.cnbc.com/quotes/JPM?tab=earnings)

- Dividend payments (last 10 years, quarterly). Check if dividends are continuous, and their progress. (trailing 5Y on cnbc)

- Market capitalization (total stock value). More than 10B is a "large" company. 

- Target price (by analysts)

- Beta

- Alpha

## graham 4 rules to stock selection:
1. adequate though not excessive diversification in portfolio. 
2. company large, respected and conservatively financed. ("common stock at book value represents at least half of the total capitalization, including all bank debt", graham, p.122)
3. long record of continuous dividend payments. 
4. price limits:
    - max price: Average EPS of last ~7 years X 25. 
    - Min price: Average EPS of last 12 months X 20. 


## ETFs

- [dividend payments last 10Y](https://www.barrons.com/market-data/funds/VIG)

- [dividend payments last 16Y](https://finance.yahoo.com/quote/VIG/history?period1=1146528000&period2=1642723200&interval=capitalGain%7Cdiv%7Csplit&filter=div&frequency=1mo&includeAdjustedClose=true)

- [total returns last 20 years](https://finance.yahoo.com/quote/VIG/performance?p=VIG) 

- [turnover rate](https://finance.yahoo.com/quote/ESGV/profile?p=VIG)

- [yield](https://finance.yahoo.com/quote/VIG?p=VIG&.tsrc=fin-srch)

- [Dividend return since 2006](https://finance.yahoo.com/quote/VIG/history?period1=1146528000&period2=1645056000&interval=capitalGain%7Cdiv%7Csplit&filter=div&frequency=1mo&includeAdjustedClose=true)

- [Dividend return since 2012](https://www.marketwatch.com/investing/fund/vig?mod=over_search)

- [holdings]('https://www.marketwatch.com/investing/fund/vig?mod=over_search')

- beta

- alpha

- expense ratio / managment fees

- net assets


# TODOS
- [ ] add stock api and layout?
- [ ] add mutual funds api and layout?


# FEATURES

User stories:
- [ ] reorder columns (drag and drop them to reorder)
- [ ] save a comparison table to review later
- [ ] save tickers in a "To Buy" list. 
    - Fields of list:
        1. List name
        2. Ticker
        3. Amount
- [ ] save tickers in a "To sell" list. 
    - Fields:
        1. List name
        2. Ticker
        3. Quantity
        4. Estimate date?
- [ ] save a named list of tickers, with percentage distribution for each one ("make my own etf").

Data processing:
- [ ] calculation: Earnings per share 10 years, calculate the growth rate. 
- [ ] graphic with the average earnings of last 10 years (EPS or total earnings, tbd). Alpha vantage -> earnings. 
- [ ] graphic with per share earnings last 10years or last 10 quarters (to determine if it's a growth stock). Alpha vantage EARNINGS 
- [ ] graphic with dividends quarterly last 10 years.




docs: https://pandas-datareader.readthedocs.io/en/latest/remote_data.html#remote-data-alphavantage



------------------

# API

[alphavantage](https://www.alphavantage.co)


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
