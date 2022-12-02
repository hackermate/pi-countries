import React from "react";
import {Link} from "react-router-dom"
import styles from "../styles/Landing.module.scss"
import mundoBola from "../images/world_flags_globe_2.gif"

export default function LandingPage(){
    return(
        <div className={styles.fondo}>
            <h1 className={styles.titles}>Welcome to the Country app</h1>
            <Link to="/countries">
                <button className={styles.button}>INGRESAR</button>
            </Link>
            <img src={mundoBola} alt="world"/>
        </div>
    )
}

