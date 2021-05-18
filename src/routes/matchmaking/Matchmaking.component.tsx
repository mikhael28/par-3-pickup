import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Pages from 'components/pages';
import Placeholder from 'components/placeholder';
import styles from './Matchmaking.module.scss';
import { golfers } from '../../config';

const {
    matchMaking,
    matchMakingContainer
} = styles;

export default function Matchmaking(): JSX.Element {

    interface Golfer {
        fName: string,
        lName: string,
        handicap: number,
        id: number
    }

    const [chosenGolfers, setGolfers] = useState<Golfer[]>([]);

    useEffect(() => {
        // this is where we pull the course name from localStorage
    }, [])

    function handleSelectChange(event: any) {
        let newGolfers = chosenGolfers.slice();
        newGolfers.push(JSON.parse(event.target.value));
        setGolfers(newGolfers)
    }

    function startGame() {
        // here we start the game
    }
    return (
        <>
            <Head>
                <title>Matchmaking</title>
            </Head>
            <main className={ matchMaking }>
                <h1>Matchmaking</h1>
                <p>
                    Select the players, set the betting odds.
                </p>
                <select onChange={handleSelectChange}>
                    <option value="none">Choose Your Players</option>
                    {golfers.map((golfer, idx) => (
                        <option value={JSON.stringify(golfer)} key={idx}>{golfer.fName}</option>
                    ))}
                </select>
                <div className={ matchMakingContainer }>
                    {chosenGolfers.map((player, idx) => {
                        return(
                            <div key={idx}>
                                {player.fName}
                            </div>
                        )
                    })}
                </div>
                <button onClick={startGame}>Start game</button>
            </main>
        </>
    );
}
