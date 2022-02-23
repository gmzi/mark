import styles from '../styles/Home.module.css'

export default function NestedTable({ data }) {
    return (
        <td className={styles.td}>
            <div dangerouslySetInnerHTML={{ __html: data }} />
        </td>
    )
}