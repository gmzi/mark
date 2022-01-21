import React from 'react'

export default function Table({ data }) {

    const list = data.data.map((obj) => {
        return (
            <li><a href={obj.url} target="_blank">{obj.title}</a></li>
        )
    })

    return (
        <>
            <h2>{data.symbol}</h2>
            <ul>{list}</ul>
        </>
    )
}

/*

<table>
              <thead>
                {tableHeads ? (
                  tableHeads.map((t) => {
                    < tr >
                      <th>
                        {t}
                      </th>
                    </tr>
                  })
                ) : <tr></tr>}
              </thead>
              <tbody>
                {tableData ? (
                  tableData.map((d) => {
                    <tr>
                      <td>
                        {d}
                      </td>
                    </tr>
                  })
                ) : <tr></tr>}
              </tbody>
            </table>

*/ 