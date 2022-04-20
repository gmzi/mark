import styles from '../styles/Home.module.css'

export default function NestedTable({ data }) {

    return (
        <td className={styles.topAlign}>
            <div className={styles.dataContainer} dangerouslySetInnerHTML={{ __html: data }} />
        </td>
    )
}