import React, { useState, useEffect } from "react";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
});

export default function useEtfData(data) {

    const [newData, setNewData] = useState()

    const update = (newData) => {
        setNewData(newData)
    }

    return { newData, update }
}