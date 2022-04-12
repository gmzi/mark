import { useState, useEffect, createRef} from "react";
import SuggestionsList from "./suggestionsList";
import { TickerSymbols } from "../lib/data";
import styles from "../styles/Home.module.css";


const KEYWORD_URL = process.env.NEXT_PUBLIC_KEYWORD_URL;

export default function AutoComplete({makeRequest}){

    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
    }, [])

    const onChange = async (e) => {
        const { name, value } = e.target;
        value.toLowerCase()
        // const userInput = e.target.value;
        const shortList = TickerSymbols.filter((suggestion) => suggestion.symbol.toLowerCase().indexOf(value) > -1)
        const format = shortList.map(f => [f.symbol + ', ' + f.name]);
        const unlinked = [].concat(...format);
        setInput(value);
        setFilteredSuggestions(unlinked)
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    }

    const onClick = (e) => {
        console.log('click', e)
        setFilteredSuggestions([]);
        setInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    }

    const onKeyDown = (key) => {
        if (key.keyCode === 13 || key.keyCode === 9) {
            if (filteredSuggestions[activeSuggestionIndex]){
                setInput(filteredSuggestions[activeSuggestionIndex])
            } 
            setFilteredSuggestions([]);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
            return;
        }
        if (key.keyCode === 38) {
            if (activeSuggestionIndex === 0) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
            return;
        } 
        if (key.keyCode === 40) {
            if (activeSuggestionIndex - 1 === filteredSuggestions.length -2 ) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex + 1);
            return;
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (input === ''){
            return
        }
        let tickerInput
        if (input.indexOf(',') > -1) {
            const splittedInput = input.split(',')
            tickerInput = splittedInput[0].toLowerCase()
        } else {
            tickerInput = input.toLowerCase()    
        }
        await makeRequest(tickerInput)
        setFilteredSuggestions([]);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
        setInput('')
    }

    

    return (
       <form className={styles.form} onSubmit={onSubmit}>
            <input 
                type="text" 
                name="tickerInput"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            {showSuggestions && input && 
                    <SuggestionsList filteredSuggestions={filteredSuggestions} activeSuggestionIndex={activeSuggestionIndex} onClick={onClick}/>
                    }
            <input type="submit" className={styles.button} />
       </form>
    );
};