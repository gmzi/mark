import react from "react";
import React, {useEffect, createRef} from "react";

export default function Focus(){

    const myRef = createRef();
    
    useEffect(() => {
        moveFocus()
    }, [])

    function moveFocus(){
        const node = myRef.current
        node.addEventListener('keydown', function(e){
            const active = document.activeElement;
            if (e.keyCode === 40 && active.nextSibling) {
                active.nextSibling.focus();
            }
            if (e.keyCode === 38 && active.previousSibling) {
                active.previousSibling.focus();
            }
        }) 
    }

    const divs = []

    for (let i = 0; i < 100; i++) {
        divs.push(<div key={i} tabIndex={i}>Pipa<span>{i}</span></div>)
    }

    return (
        <div ref={myRef}>
            {divs}
        </div>
    )
}