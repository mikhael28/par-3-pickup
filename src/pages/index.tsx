import React from 'react';
import Page from 'routes/page';

export default function Home(props: any): JSX.Element {
    return <Page isLanding {...props} />;
}
