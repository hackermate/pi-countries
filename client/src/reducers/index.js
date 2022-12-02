import {
  GET_ACTIVITY,
  GET_COUNTRIES,
  BY_CAPITALS,
  GET_DETAIL,
  BY_NAME,
  BY_ORDER,
  BY_POPULATION,
  BY_POPULATIONZERO,
  BY_CONTINENT,
  BY_ACTIVITY,
  FAILURE,
  LOADING
} from '../actions/constantes';

const initialState = {
  countries: [],
  allContinents: [],
  population: [],
  allActivities: [],
  activity: [],
  details: [],
  loading: false,
  error: ''
}

function reducer(state = initialState, action) {
  switch (action.type){
    case GET_COUNTRIES:
      return {
        ...state,
        error: "",
        countries: action.payload,
        allContinents: action.payload,
        population: action.payload,
        allActivities: action.payload,
        searchName: action.payload,
  }
    case GET_DETAIL:
      return {
        ...state,
        details: action.payload,
        loading: false
      }
    case BY_NAME:
      return {
        ...state,
        countries: action.payload,
        error: ""
      }
    case BY_ORDER:
      const orderCountries = action.payload === 'Asc' ?
        state.countries.sort(function(a, b)
        {
          if(a.name > b.name) {
            return 1;
          }
          if(a.name < b.name) {
            return -1;
          }
          return 0;
        }
      ) : state.countries.sort(function(a, b)
        {
          if(a.name > b.name) {
            return -1;
          }
          if(a.name < b.name) {
            return 1;
          }
          return 0;
        }
      )
      return {
        ...state,
        countries: orderCountries
      }
    case GET_ACTIVITY:
      return {
        ...state,
        loading: false,
        activity: action.payload
      }
    case BY_POPULATION:
      const orderPopulation = action.payload === 'Min' ?
        state.countries.sort(function(a, b){
          if(a.population > b.population) {
            return 1;
          }
          if(a.population < b.population) {
            return -1;
          }
          return 0;
        }) :
        state.countries.sort(function(a, b){
          if(a.population > b.population) {
            return -1;
          }
          if(a.population < b.population) {
            return 1;
          }
          return 0;
        })
      return {
        ...state,
        population: orderPopulation     
      }
    case BY_POPULATIONZERO:
      const countryPopulation = state.countries.filter(c => c.population === 0)
      return {
        ...state,
        countries: countryPopulation
      }
    case BY_CONTINENT:
      const allContinents = state.allContinents;
      const continentFilter = action.payload === 'All' ? allContinents :
      allContinents.filter(c => c.continent === action.payload);
      return {
        ...state,
        countries: continentFilter
      }
    case BY_CAPITALS:
      const allCountries = state.countries;
      const capitalFilter = action.payload === 'All' ? allCountries :
      allCountries.filter(c => c.capital === action.payload);
      return {
        ...state,
        countries: capitalFilter
      }
    case BY_ACTIVITY:
      const allActivities = state.allActivities;
      const activityFilter = action.payload === 'All' ? allActivities.filter(e => e.activities.length > 0) :
      allActivities.filter(c => c.activities.find(a => a.name.toLowerCase() === action.payload));
      return {
        ...state,
        countries: activityFilter
      }
    case FAILURE:
      return {
        ...state,
        error: action.payload
      }
    case LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
    }
}

export default reducer;