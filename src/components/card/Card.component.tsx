import React from 'react';
import { REPL_MODE_SLOPPY } from 'repl';
import styles from './Card.module.scss'

export default function Card(props: any) {
    const {
        card,
    } = styles;
    return(
        <figure className={card} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} onClick={props.handleClick}>
            <div>
                <img src={props.picture} height="60" width="60" alt={props.name} />
            </div>
            <div>
                <h2>{props.name}</h2>
                <p>{props.city}</p>
            </div>
            <div>
                <p>Par: {props.par}</p>
                <p>PB: 0</p>
            </div>
            
        </figure>
    )
}
