import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Context } from 'state/context/globalContext';


import EventCard from 'components/EventCard';
import Filter from 'components/Filter';
import styles from 'styles/Events.module.css'


export default function Events() {
  const router = useRouter();

  const [id, setId] = useState(null);

  useEffect(( ) => {
    setId(router.query.events);
  }, [router])

  const { state } = useContext(Context);
  const { events } = state;

  return (
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>Все события города в одном месте для вас</h2>
          
        </div>

        <div className={styles.contant}>
          <Filter/>
  
          <div className={styles.eventsWrapper}>
            {id ? 
            <>
              {events
                .filter(event => event.cat_id === +id)
                .map(event => { console.log(event)
                  return ( <div className={styles.event}><EventCard key={event.id} data={event}/></div> )
                })
              } 
            </>   
            : null}
          </div>
        </div>
      </div>
  )
}
