import React, { useContext } from 'react'
import styles from 'styles/components/FilterNerby.module.css';
import { Context } from 'state/context/globalContext';
import Link from 'next/link';
import Image from 'next/image';

export default function FilterNerby({ setFilNer, filNer, setFilName }) {
    const { state } = useContext(Context);
    const { categories } = state;
    return (
        <div className={styles.wrapper}>
            { categories.map( cat => ( 
                <div onClick={() => {
                    setFilName(cat.title)
                    setFilNer(cat.id)
                }} className={styles.cat} style={filNer == cat.id ? {color:'#4DABE9'} : {}}>{cat.title}</div>
            )) }
            <Link href={`/`}><a className={styles.cat}>Все события в городе <Image src="/arrowRight.svg" width={20} height={20} /></a></Link>
        </div>
    )
}
