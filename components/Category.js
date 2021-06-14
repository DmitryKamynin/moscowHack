import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from 'styles/components/Category.module.css';

export default function Category({ children, data }) {
    const { title } = data;

    return (
        <div className={styles.wrapper}>
            <h2>{ title }</h2>
            <div className={styles.eventCards}>{ children }</div>

            <Link href='/'>
                <div className={styles.link}>
                    <Link href={`/events/${data.id}`}><a>Смотреть события по теме <Image src="/arrowRight.svg" width={20} height={20} /></a></Link>
                </div> 
            </Link>
            
        </div>
    )
}
