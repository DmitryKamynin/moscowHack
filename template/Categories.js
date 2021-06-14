import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Context } from 'state/context/globalContext';
import styles from 'styles/template/Categories.module.css';

export default function Categories() {
    const { state } = useContext(Context);
    const { categories } = state;
    const router = useRouter();

    return (
        <div className={styles.wrapper} style={router.asPath == '/nerby' ? {display:'none'} : {} }>
            
            <div className={styles.container}>
                <Link href={`/nerby`}>
                    <div 
                        style={router.asPath == '/nerby' ? {color: '#F3A74F'} : {}} 
                        className={styles.link}>
                            Рядом со мной
                        </div>
                </Link>
                { categories.map(category => ( 
                    <Link key={category.id} href={`/events/${category.id}`}>
                        <div 
                            style={router.query.events == category.id ? {color: '#F3A74F'} : {}} 
                            className={styles.link}>
                            {category.title}
                        </div>
                    </Link>
                )) }
            </div>
        </div>
    )
}
