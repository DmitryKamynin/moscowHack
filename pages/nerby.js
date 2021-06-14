import { useEffect, useState, useContext, useMemo } from 'react';


import { Map, Placemark } from 'react-yandex-maps';
import EventCard from 'components/EventCard';
import FilterNerby from 'components/FilterNerby';
import Filter from 'components/Filter';

import styles from 'styles/Nerby.module.css'

export default function Events() {

    const [center, setCenter] = useState([55.75423169127635,37.62577464020195])

    const [events, setEvents] = useState(null)
    const [currPosition, setCurrPosition] = useState(null);
    const [open, setOpen] = useState(false);

    const [filNer, setFilNer] = useState(null);
    const [filName, setFilName] = useState(null);

    const mapState = useMemo(() => ({
        center,
        zoom: 13,
        controls: ['zoomControl', 'fullscreenControl'],
        behaviors:['default']
    }), []);

    // const { events, spots } = state;
  //  http://185.185.69.68:7777/upcoming-events/?lon=37.617575&lat=55.755194
    useEffect(() => {
      if(navigator.geolocation){
        const getPos = (position) => {
          setCurrPosition([position.coords.latitude, position.coords.longitude])
        }
        navigator.geolocation.getCurrentPosition(getPos);
      }
    }, [])

    useEffect(() => {
      if(currPosition){
        (async function(){
          try{
            let result = await fetch(`http://185.185.69.68:7777/upcoming-events/?lon=${currPosition[1]}&lat=${currPosition[0]}`)
            result = await result.json();
            setEvents(result)
          }catch ( err ){
            throw new Error( 'fetch error in Nerby.js => ', err )
          }
        })()
      }
    }, [currPosition])


    return (
      <div className={styles.containter}>
            <h1 className={styles.title}>Все события рядом с вами</h1>
            <FilterNerby setFilNer={setFilNer} filNer={filNer} setFilName={setFilName}/>
            <Map
              state={mapState}
              modules={['control.ZoomControl', 'geocode','geolocation', 'control.FullscreenControl']}
              className={styles.map}
            >
                      {currPosition ? <Placemark
                        geometry={ currPosition }
                        properties={{
                        iconCaption: `Вы здесь`,
                        }}

                    /> : null}
              {events ? events
                .filter( event => {
                  if(!filNer) return true;
                  else return event.cat_id == filNer;
                })
                .map( event => {
                    const { lat, lon, title, date_time_finish, date_time_start } = event;
                    return (
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
                          iconImageSize: [30, 30],
                          iconContentLayout: `${title}`,
                        }}

                        modules={
                        ['geoObject.addon.balloon']
                        }
                    /> )
              }) : null}
            </Map>

            <div className={styles.eventContainer}>
                <div className={styles.events}>
                  <div className={styles.filName}>{filName || 'Выберите категорию'}</div>
                  <Filter nerby/>
                  { events ? events
                    .filter( event => {
                      if(!filNer) return true;
                      else return event.cat_id == filNer;
                    })
                    .map( event => <div style={{marginBottom: '10px'}}><EventCard nerby key={event.id} data={event}/></div> ) : null
                  }
                </div>
            </div>
            
            <div className={styles.mobileEventContainer} style={!open ? {top: 'calc(100% - 45px)'} :  {top: 'calc(0%)'}} onClick={() => setOpen(!open)}>
                <div className={styles.rectangle}></div>
                <h2>Список событий</h2>
                <Filter/>
                <div className={styles.events}>
                  { events ? events
                    .filter( event => {
                      if(!filNer) return true;
                      else return event.cat_id == filNer;
                    })
                    .map( event => <div style={{marginBottom: '10px'}}><EventCard nerby key={event.id} data={event}/></div> ) : null
                  }
                </div>
            </div>
      </div>
  )
}
