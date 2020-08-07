import React from 'react';

import classes from './GPSButton.module.css';
import IconButton from '@material-ui/core/IconButton';
import MyLocationIcon from '@material-ui/icons/MyLocation';

const gpsButton = (props) => {
    return (
        <div className={classes.GPSButton}>
            <IconButton 
                name={props.name}
                type={props.type}
                onClick={props.clicked}>
                <MyLocationIcon />
            </IconButton>
        </div>

    )
}

export default gpsButton;