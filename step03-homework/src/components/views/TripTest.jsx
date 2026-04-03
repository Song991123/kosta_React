import React from 'react';
import Header from '../layout/Header';
import Nav from '../layout/Nav';
import Article from '../layout/Article';
import styles from '../../styles/TripTest.module.css';
import Trip from '../ui/Trip';

const TripTest = () => {
    return (
        <>
            <Header title="Trip" />
            <Nav/>
            <Article
                title="태어난김에 세계일주"
                body="올 여름 최고의 찬스"
                titleClass={styles.title}
                bodyClass={styles.body}
            />
            <Trip imgClass={styles.imgStyle}/>
        </>
    );
};

export default TripTest;
