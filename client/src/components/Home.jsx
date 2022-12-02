import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActivity, byContinent, byActivity, byPopulation, byCapitals, byPopulationZero, byOrder, getCountries} from  "../actions";
import style from "../styles/Home.module.scss";
import Paginado from "./Paginado.jsx";

function Home () {
    const dispatch = useDispatch();
    const [order, setOrder] = useState("");

    const countries = useSelector((state) => state.countries);
    const activity = useSelector((state) => state.activity);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(9);

    const max = Math.round(countries.length / countriesPerPage);

    useEffect(() => {
        dispatch(getCountries());
        dispatch(byActivity());
    }, [dispatch]);

    function handleOrder(e) {
        e.preventDefault();
        dispatch(byOrder(e.target.value));
        setOrder(e.target.value);
    }

    function handleContinent(e) {
        e.preventDefault();
        dispatch(byContinent(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1)
    }

    function handlePopulationZero(e) {
        e.preventDefault();
        dispatch(byPopulationZero(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1)
    }

    function handleOrderPopulation(e) {
        e.preventDefault();
        dispatch(byPopulation(e.target.value));
        setOrder(e.target.value);
    }

    function handleActivity(e) {
        e.preventDefault();
        dispatch(byActivity(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1);
    }

    function handleCapital(e) {
        e.preventDefault();
        dispatch(byCapitals(e.target.value));
        setOrder(e.target.value);
        setCurrentPage(1);
    }

    useEffect(() => {
        dispatch(getActivity());
    }, [dispatch]);

    return(
        <div>
            <div className={style.filters}>
                <div className={style.filter}>
                    <select onChange={handleOrderPopulation}>
                        <option value='Max' key='Max'>Max population</option>
                        <option value='Min' key='Min'>Min population</option>
                    </select>
                </div>
                <div className={style.filter}>
                    <select onChange={handleContinent}>
                        <option value='All' key='All'>All</option>
                        <option value='Africa' key='Africa'>Africa</option>
                        <option value='Antartica' key='Antartica'>Antartica</option>
                        <option value='Asia' key='Asia'>Asia</option>
                        <option value='Europe' key='Europe'>Europe</option>
                        <option value='North America' key='North America'>North America</option>
                        <option value='Oceania' key='Oceania'>Oceania</option>
                        <option value='South America' key='South America'>South America</option>
                    </select>
                </div>
                <div className={style.filter}>
                    <select onChange={handleActivity}>
                        <option value='All' key='All'>All activities</option>
                        {activity.map((a) => (
                            <option value={a} key={a}>{a}</option>
                        ))}
                    </select>
                </div>
              
                
                <div className={style.filter}>
                    <select onChange={handleOrder}>
                        <option value='A-Z' key='A-Z'>A-Z</option>
                        <option value='Z-A' key='Z-A'>Z-A</option>
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <button onClick={handlePopulationZero}>Poblacion menor que 1000</button>
                </div>
                <div>
                    <input type="text" onChange={handleCapital} placeholder="...Capitals"></input>
                </div>
            <div className={style.containerCountry}>
                {countries.slice(
                    (currentPage - 1) * countriesPerPage, 
                    (currentPage - 1) * countriesPerPage + countriesPerPage
                ).map((c) => {
                    return (
                        <Link to={'/countries/' + c.id} key={c.id}>
                            <div className={style.card}>
                                <p>{c.name}</p>
                                <img src={c.flags} alt={c.name} />
                            </div>
                        </Link>
                    )
                })}
            </div>            
        </div>
        <div>
            <Paginado currentPage={currentPage} setCurrentPage={setCurrentPage} max={max}/>
        </div>
    </div>
    )
}

export default Home;