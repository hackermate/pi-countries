import axios from 'axios';
import {
  
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
  LOADING,
  GET_ACTIVITY
} from './constantes';

const urlCo = 'http://localhost:3001/countries';
const urlAc = 'http://localhost:3001/activities';

export function getCountries() {
  return async function(dispatch) {
    try {
      const res = await axios.get(urlCo);
      return dispatch({
        type: GET_COUNTRIES,
        payload: res.data
      });
    }catch (error) {
      return dispatch({
        type: FAILURE,
        payload: error.response.data.msg
      });
    }
  }
}

export function getDetail(id) {
  return async function(dispatch) {
    try {
      dispatch({
        type: LOADING
      });
      const res = await axios.get(`${urlCo}/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: res.data
      });
    }catch (error) {
      console.log(error);
    }
  }
}

export function postActivity(payload) {
  return async function() {
    try {
      const res = await axios.post(urlAc, payload);
      return res;
    }catch (error) {
      console.log(error);
    }
  }
}

export function byOrder(payload) {
  return {
    type: BY_ORDER,
    payload
  }
}

export function byPopulation(payload) {
  return {
    type: BY_POPULATION,
    payload
  }
}

export function byPopulationZero(payload) {
  return {
    type: BY_POPULATIONZERO,
    payload
  }
}


export function byContinent(payload) {
  return {
    type: BY_CONTINENT,
    payload
  }
}

export function byActivity(payload) {
  return {
    type: BY_ACTIVITY,
    payload
  }
}

export function getActivity() {
  return async function(dispatch) {
    try {
      const res = await axios.get(urlAc);
      return dispatch({
        type: GET_ACTIVITY,
        payload: res.data
      });
    }catch (error) {
      console.log(error);
    }
  }
}

export function getByName(name) {
  return async function(dispatch) {
    try {
      const res = await axios.get(`${urlCo}?name=${name}`);
      return dispatch({
        type: BY_NAME,
        payload: res.data
      });
    }catch (error) {
      return dispatch({
        type: FAILURE,
        payload: error.response.data.msg
      });
    }
  }
}

export function byCapitals(capital) {
  return async function (dispatch){
    try {
      const res = await axios.get(`${urlCo}?capital=${capital}`);
      return dispatch({
        type: BY_CAPITALS,
        payload: res.data
      });
    }catch (error) {
      return dispatch({
        type: FAILURE,
        payload: error.response.data.msg
      });
    }
  }
}