import React, { useContext } from 'react'
import Link from 'next/link';
import styles from 'styles/components/EventCard.module.css';
import { Context } from 'state/context/globalContext';
import { URL } from 'config';

export default function EventCard({ data, nerby }) {
    const { state } = useContext(Context);

    const { id, org_id, title, date_time_start, image } = data;
    
    const time = new Date(date_time_start);

    const { address } = state.spots.find( spot => spot.id === org_id );

    return (
        <Link href={`/event/${id}`}>
            <a className={styles.bg}>
                <div className={styles.container} style={{backgroundImage: `url(${nerby ? `${URL}${image}` : image })`}}>

                    <p className={styles.title}>{ title }</p>
                    <p className={styles.address}>{ address }</p>
                    <div className={styles.wrapper}>
                        <p className={styles.day}>
                            {time.getDate()}.
                            {time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1 }
                        </p>

                        <p className={styles.day}>
                            {time.getHours() < 10 ? `0${time.getHours}` : time.getHours()}:
                            {time.getMinutes() < 10 ? `0${time.getMinutes() + 1}` : time.getMinutes() + 1 }
                        </p>
                    </div>
                </div>
            </a>
        </Link>
    )
}
