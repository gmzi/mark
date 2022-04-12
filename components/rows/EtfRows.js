import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useEffect } from 'react';
import TableHead from '../TableHead';
import TableData from '../TableData';
import NestedTable from '../NestedTable';

export default function EtfRows({legalList}){
    return (
        
            <>
            <td className={`${styles.td} ${styles.rowTitle}`}>Legal Type</td>
            {legalList}
      </>
    )
}