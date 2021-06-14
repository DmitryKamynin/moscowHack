import React, {useState} from 'react'
import { FormControlLabel, Checkbox, Drawer } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import styles from 'styles/components/Filter.module.css';

const Contant = () => (
    <>
        <p className={styles.fieldName}>Тип мероприятия:</p>
        <FormControlLabel
            control={<Checkbox  name="jason" />}
            label="Кино"
        />
            <FormControlLabel
            control={<Checkbox name="jason" />}
            label="Театр"
        />
            <FormControlLabel
            control={<Checkbox name="jason" />}
            label="Ночьная жизнь"
        />
            <FormControlLabel
            control={<Checkbox name="jason" />}
            label="Культура"
        />
    
        <p className={styles.fieldName}>Дата:</p>
        <FormControlLabel
            control={<Checkbox  name="jason" />}
            label="В будущем"
        />
            <FormControlLabel
            control={<Checkbox name="jason" />}
            label="Сегодня"
        />
            <FormControlLabel
            control={<Checkbox name="jason" />}
            label="В прошлом"
        />
    
        <Link href={`/nerby`}><a style={{marginTop: '20px', display:'flex', alignItems:'center'}}>События рядом со мной <Image src="/arrowRight.svg" width={20} height={20} /></a></Link>
    
        <p className={styles.reset}>Сбросить всё Х</p>
    </>
)

export default function Filter({nerby}) {
    const [menu, setMenu] = useState(false);
    return (
        <>
            <div style={nerby? {display:'flex'}: {}} className={styles.mobileBtn} onClick={() => setMenu(true)}>Показать фильтры  <Image src="/filter.png" width={20} height={20} /></div>

            <div style={nerby? {display:'none'}: {}} className={styles.desctopWrapper}>
                <Contant/>
            </div>

            <Drawer style={{padding: '0px 10px'}} open={menu} onClose={() => setMenu(false)}>
                <Contant/>
            </Drawer>
        </>
    )
}
