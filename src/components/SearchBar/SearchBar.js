import React from 'react';

import classes from './SearchBar.module.css';
import InputField from '../../elements/InputField/InputField';
import Button from '../../elements/Button/SetButton'
import GPSButton from '../../elements/Button/GPSButton'

const SearchBar = (props) => {
    return (
        <div className={classes.SearchBarWrapper}>
            <InputField 
                type="text"
                name="city"
                label="Location"
                placeholder="Enter a city"
                value={props.value}
                handleChange={props.onChangeHandler}
                error={props.error} />
            <GPSButton 
                name="getGeolocation"
                type="submit"
                clicked={props.getLocationHandler}/>
            <Button 
                name="searchSubmit"
                type="submit"
                position="onForm"
                clicked={props.onClickHandler}>Set</Button>
            
        </div>
    )
}

export default SearchBar;