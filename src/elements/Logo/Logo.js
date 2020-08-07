import React from 'react';

import classes from './Logo.module.css';

const Logo = (props) => {
    let logoWithColorSchheme = [
        classes.Logo,
        (props.colorScheme === 'dark') ? classes.Dark : classes.Light
    ];
    return (
        <h1 className={logoWithColorSchheme.join(' ')}>
            Instant Weather
        </h1>    
    );
}

export default Logo;