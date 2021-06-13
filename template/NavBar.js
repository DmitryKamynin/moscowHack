import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Drawer } from '@material-ui/core';

import styles from 'styles/template/NavBar.module.css';

export default function NavBar() {
    const [ menu, setMenu ] = useState(false);

    return (
        <>
            <div className={styles.wrapper}>
               <Link href={`/`}> 
                
                    <div className={styles.logo}> 
                        <Image src='/logo.svg' width={16} height={20}/>mos.ru
                    </div>
                
                </Link>

                <Link href={`/`}><p>Все события</p></Link>
                <Link href={`/`}><p>Избранное</p></Link>

                <Image src={`/menu.svg`} width={22} height={22} onClick={() => setMenu(true)}/>
            </div>

            <Drawer open={menu} onClose={() => setMenu(false)}>
                <Link href={`/`}><p className={styles.link}>Все события</p></Link>
                <Link href={`/`}><p className={styles.link}>Избранное</p></Link>
            </Drawer>

        </>
    )
}
