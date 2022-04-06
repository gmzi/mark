import styles from '../styles/Home.module.css'

export default function TableData({ data, isParagraph=false }) {
    if (isParagraph){
        return (
        <td className={`${styles.td} ${styles.isParagraph}`}>
            <p>{data}</p>
        </td>
        )
    }
    return (
        <td className={`${styles.td}`}>{data}</td>
    )
}