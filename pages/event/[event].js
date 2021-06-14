import { useEffect, useState, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'

import { Button, Dialog } from '@material-ui/core';
import uiStyles from 'styles/ui/button.module.css';
import { Map, Placemark } from 'react-yandex-maps';

import { Context } from 'state/context/globalContext';

import styles from 'styles/Event.module.css'

export default function Events() {
  const { state } = useContext(Context);
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [map, setMap] = useState(false);
  const [center, setCenter] = useState([55.75423169127635,37.62577464020195])
 
  useEffect(( ) => {
    if(router.query) setEvent(state.events.find( event => event.id == router.query.event ));
  }, [router])

  const spot = state.spots.find( spot => spot.id === event?.org_id );

  const mapState = useMemo(() => ({
    center,
    zoom: 13,
    controls: ['zoomControl', 'fullscreenControl'],
    behaviors:['default']
  }), []);

  if(event){
    const { image, title , description, date_time_start, date_time_finish, price } = event;

    const { address, lat, lon } = spot;

    return (
      <>
        <div className={styles.container}>
          <Link href="/">
              <p className={styles.backBtn}>
                  <Image src={`/icon.svg`} width={20} height={20}/>
                  назад к событиям
              </p>
          </Link>

          <div className={styles.image}>
            <img style={{width: '100%'}} src={`${image}`}/>
          </div>
  
          <div className={styles.content}>
   
  
            <h2 className={styles.title}>{ title }</h2>

            <p className={styles.description}>
              { description }
            </p>
  
            <div className={ styles.block }>
              <div className={ styles.subBlock }>
                <h2>Место проведения</h2>
                <p>{ address }</p>
                <p onClick={() => setMap(true)}> 
                  <Image src={`/mapIcon.svg`}  width={20} height={20}/>
                  показать на карте
                </p>
              </div>
  
              <div className={ styles.miniContent }>
  
              </div>
            </div>
  
            <div className={ styles.block }>
              <div className={ styles.subBlock }>
                 <h2>Дата события</h2>
                 <p> 
                  {date_time_start.match(/\d\d:\d\d/)[0]} — {date_time_finish.match(/\d\d:\d\d/)[0]}
                </p>
              </div>
              <div className={ styles.miniContent }>
              {date_time_start.match(/\d\d\d\d-\d\d-\d\d/)[0].replace(/-/g, '.')}
              </div>
            </div>
  
            <div className={ styles.block }>
              <div className={ styles.price }>
                <p>Стоимость входа: { price }₽ </p>
                <p>Мест свободно: 52</p>
              </div>
            </div>
  
            <div className={ styles.block }>
              <div className={ styles.price }>
                <Button classes={{root: uiStyles.primary}}>Забронировать место</Button>
                <Button classes={{root: uiStyles.secondary}}>В избранное</Button>
              </div>
            </div>
  
          </div>
  
        </div>

        <Dialog
        fullWidth
          maxWidth={false}
          open={map}
          onClose={( ) => setMap(false)}
        >
          <div className={styles.map}>
            <Map
               style={{height: '100%', width: '100%'}}
              state={mapState}
              modules={['control.ZoomControl', 'control.FullscreenControl']}
            >
              <Placemark
                geometry={ [lat, lon] }

                properties={{
                  iconCaption: `${title}`,
                  balloonContentBody:`${title}</br>
                                      ${date_time_start.match(/\d\d:\d\d/)[0]} — ${date_time_finish.match(/\d\d:\d\d/)[0]}</br>`,
                }}

                options={{
                  iconLayout: 'default#image',
                  iconImageHref: '/placemark.svg',
                  iconImageSize: [40, 40],
                  iconContentLayout: `${title}`,
                }}

                modules={
                  ['geoObject.addon.balloon']
                }
              />
            </Map>
          </div>
        </Dialog>
      </>
  )
  }
  else return <div></div>
}
