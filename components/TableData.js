import styles from '../styles/Home.module.css'

export default function TableData({ data }) {
    return (
        <td className={styles.td}>{data}</td>
    )
}