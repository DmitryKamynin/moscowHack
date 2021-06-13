import { useContext } from 'react';

import { Context } from 'state/context/globalContext';
import EventCard from 'components/EventCard';
import Category from 'components/Category';

import styles from 'styles/Home.module.css'


export default function Events() {

  const { state } = useContext(Context);

  const { categories, events } = state;

  return (
      <div className={styles.container}>
      
          { categories.map( category => (
            <Category key={category.id} data={category}>
              { events
                  .filter( event => event.cat_id === category.id ) 
                  .map( event => ( 
                    <EventCard key={event.id} data={event}/>
              ) ) }   
            </Category>     
          ) ) }
         
      </div>
  )
}
