import React from 'react';
import Head from 'next/head';
import Landing from 'routes/page/landing';
import A2HS from 'components/a2hs';
import Sidebar from 'components/sidebar';
import Html from 'components/html';
import Card from 'components/card';
import { usePageData, usePageDetails } from 'hooks/page';
import { injectClassNames } from 'utils/css';
import styles from './Page.module.scss';
import { courses } from '../../config'
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
        return <></>;
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

    const classNames = injectClassNames(page, [pageLanding, isLanding]);

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
                    <h1>Choose your course 🏌️‍♂️ ⛳</h1>
                    {courses.map((course, index) => {
                        return(
                            <Card {...course} handleClick={() => router.push(`/course/${course.codeName}`)} key={index} />
                        )
                    })}
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
