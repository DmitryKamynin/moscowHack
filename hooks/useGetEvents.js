import { useState, useEffect, useContext } from 'react';
import { Context } from 'state/context/globalContext';

import { URL } from 'config';
import test from 'test.json';

export default function useGetEvents() {
    const [page, setPage] = useState(1);
    const { state, dispatch } = useContext(Context);

    const handlePage = (value) => {
        if(state.page < state.totalPage) setPage(value);
        else return false;
    }

    useEffect(() => {
        (async function(){
            try{
                const result = await fetch(`${URL}/event/`);
                const events = await result.json();
                console.log(test)
                dispatch({ type:'SUCCESS', page, events })
            }
            catch(err){
                console.error( `useGetEvents error: -> ${err}` );
            }
        })();
    }, [page]);

    return { handlePage };
}
