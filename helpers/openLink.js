export default function openLink(prop, source, ticker) {
    let windowObject = null;

    if (windowObject == null || windowObject.closed) {
        windowObject = window.open(`${source[prop]().url}`,
            `${ticker}-${source[prop].title}`,
            // "left=100,bottom=100,width=320,height=320"
            "right=100, top=900, width=500, popup=yes, rel=noopener, rel=noreferrer"
        );
    } else {
        windowObject.focus()
    }
}