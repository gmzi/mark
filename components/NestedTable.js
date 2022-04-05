import styles from '../styles/Home.module.css'

export default function NestedTable({ data, topAlign }) {


    if (topAlign) {
        return (
        <td className={`${styles.td} ${styles.topAlign}`}>
            <div className={styles.dataContainer} dangerouslySetInnerHTML={{ __html: data }} />
        </td>    
        )
    }

    return (
        <td className={styles.td}>
            <div className={styles.dataContainer} dangerouslySetInnerHTML={{ __html: data }} />
        </td>
    )
}