const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export function isDuplicate(array, value) {
    if ([...array].includes(value)) {
      setLoading(false)
      return true;
    }
    return;
  }


export async function dataRequest(asset_class, ticker, stateData, setStateData, setLoading){
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