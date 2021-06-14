import { createContext, useEffect, useReducer } from 'react';
import globalReducer from 'state/reducers/globalReducer';

import { URL } from 'config';
import Categories from 'template/Categories';
import NavBar from 'template/NavBar';
import Template from 'template/Template';

export const Context = createContext();

export function GlobalContext({children}) {

    const [state, dispatch] = useReducer(globalReducer ,{
        loading: true,
    })

    useEffect( () => {
        (async function(){
            try{
                let categories = await fetch(`${URL}/category/`);
                categories = await categories.json();
                let events = await fetch(`${URL}/event/`);
                events = await events.json();
                let spots = await fetch(`${URL}/spot/`);
                spots = await spots.json();
                dispatch({ type: 'SUCCESS', categories, events, spots })
            }
            catch(err){
                console.error( new Error(`error in globalContext ${err}`) )
            }
        })()
    }, [] );

    return (
        <Context.Provider value={{ state, dispatch }}>
            <NavBar/>
            <Template>{state.loading ? <div>Loading...</div> : <><Categories/>{children}</>}</Template>
        </Context.Provider>
    )
}
