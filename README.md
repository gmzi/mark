# Mark

Screen financial assets (etfs, mutual funds and stocks) over metrics other than price. On entering ticker symbol program will classify asset class, fetch corresponding data and display it in a table where user can add more tickers for screening or comparison purposes.

## Usage

`npm run dev` to run locally.

- Set up a server with these GET routes:
  1. `/class?ticker=<ticker>`
  2. `/etf?ticker=<ticker>`
  3. `/mf?ticker=<ticker>`
  4. `/stock?ticker=<ticker>`
- Install packages and `npm run dev` in terminal.
