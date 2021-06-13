export default function globalReducer(prevstate, { type, categories, events, spots } ){
    switch( type ){
        case 'LOAD':
            return {
                ...prevstate,
                loading: true,
            };
        case 'SUCCESS':
            return {
                ...prevstate,
                events,
                categories,
                spots,
                loading: false,
            };
        default:{
            throw new Error('invalid type event');
        }
    }
}