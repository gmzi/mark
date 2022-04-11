import { useState, useEffect, createRef} from "react";
import styles from '../styles/Home.module.css'

export default function SuggestionsListComponent({filteredSuggestions, activeSuggestionIndex, onClick}){

  const myRef = createRef();

  useEffect(() => {
    const node = myRef.current
    if (node.childElementCount > 0) {
      if (activeSuggestionIndex < node.childElementCount){
        moveScroll(node)
      }
    }
  }, [activeSuggestionIndex])

  function moveScroll(node){
      const children = node.children;
      children[activeSuggestionIndex].scrollIntoView({behavoir: 'smooth'})
    }

  const suggestions = filteredSuggestions.map((suggestion, index) => {
    let className;
    if (index === activeSuggestionIndex){
        className = `${styles.activeSuggestion}`;
    }
    return (
        <li className={`${styles.dropdownItem} ${className}`} key={suggestion} tabIndex={index} onClick={onClick}>
            {suggestion}
        </li>
    )
})

    return filteredSuggestions.length ? (
        <div className={styles.dropdownContainer}>
            <div className={styles.dropdown}>
            <ul ref={myRef} className={styles.suggestionsList}>
                 {suggestions}
            </ul>
             </div>
         </div>
    ) : (
    null
    );
  };