import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Landing from 'routes/page/landing';
import A2HS from 'components/a2hs';
import Sidebar from 'components/sidebar';
import Html from 'components/html';
import Card from 'components/card';
import GameNav from 'components/header/game-nav';
import { usePageData, usePageDetails } from 'hooks/page';
import { injectClassNames } from 'utils/css';
import styles from './Page.module.scss';
import { courses, Course, Game } from '../../config'
import { useRouter } from 'next/router';

const {
    page,
    pageLanding,
    pageContent,
    placeholder
} = styles;

type PageProps = {
    isLanding?: boolean
};

export const addTitleTags = (title: string): JSX.Element => {
    if (!title) {
        return <React.Fragment />;
    }

    return (
        <>
            <title>{ title }</title>
            <meta name="og:title" content={ title } />
        </>
    );
};

export const addDescriptionTag = (description: string): JSX.Element => {
    if (!description) {
        return <></>;
    }

    return (
        <meta
          name="description"
          property="og:description"
          content={ description }
        />
    );
};

export default function Page(props: PageProps): JSX.Element {
    const { isLanding } = props;
    const { title = '', description = '' } = usePageDetails();
    const { content = '' } = usePageData();
    const router = useRouter();
    const [active, setActive] = useState<boolean>(true);
    const [activeCourse, setActiveCourse] = useState<Course>({
        id: '',
        name: '',
        codeName: '',
        par3: false,
        eighteen: false,
        street: '',
        city: '',
        zip: '',
        par: 0,
        putting: 0,
        picture: '',
        holes: []
    })

    const [activeGame, setActiveGame] = useState<Game>({
        id: '',
        course: '',
        perHoleWager: 0,
        ldWager: 0,
        players: [],
        holes: []
    })

    const classNames = injectClassNames(page, [pageLanding, isLanding]);

    useEffect(() => {
        // localStorage.clear()
        let gameCheck = localStorage.getItem('activeCourse');
        if (gameCheck !== null) {
            console.log('Course Check: ', JSON.parse(gameCheck));
            setActiveCourse(JSON.parse(gameCheck));
        }
        let activeCheck = localStorage.getItem('activeGame');
        if (activeCheck !== null) {
            console.log('Game check: ', JSON.parse(activeCheck))
            setActiveGame(JSON.parse(activeCheck));
            setActive(true);
        }
    }, [])

    useEffect(() => {
        console.log('New score')
    }, [activeGame])

    function update(game) {
        setActiveGame(game)
    }

    return (
        <>
            <Head>
                { addTitleTags(title) }
                { addDescriptionTag(description) }
                <meta name="robots" content="INDEX,FOLLOW" />
            </Head>
            <main>
                {/* { isLanding && <Landing /> } */}
                <section>
                    
                    <A2HS />
                    {active === true ? (
                        <GameNav activeGame={activeGame} activeCourse={activeCourse} update={update} />
                        ) : <div>

                    <h1>Choose your course 🏌️‍♂️ ⛳</h1>
                    {courses.map((course, index) => {
                        return(
                            <Card {...course} handleClick={() => {
                                localStorage.setItem('activeCourse', JSON.stringify(course));
                                router.push(`/matchmaking`);
                            }} key={index} />
                        )
                    })}
                        </div>}
                    
                    {/* <Card title="Fore!" description="Click or tap here to start a new game!" onClick={() => props.history.push('/course/jackson')} /> */}
                        {/* <div className={pageContent}>
                            <>
                                <figure className={ placeholder } />
                                <figure className={ placeholder } />
                                <figure className={ placeholder } />
                            </>
                        </div> */}
                    {/* <Sidebar /> */}
                </section>
            </main>
        </>
    );
}
