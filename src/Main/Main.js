import React, { useEffect, useState } from 'react';
import './Main.scss';
import arrow from './Images/icon-arrow-up.svg';
import moon from './Images/icon-moon.svg';
import sun from './Images/icon-sun.svg';

const Main = (props) => {

    const more = props.more;
    const setMore = props.setMore;
    const time = props.time;
    const timezone = props.timezone;
    const day = props.day;

    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')

    const getLocation = async() =>{
        const response = await fetch(`http://ipwhois.app/json/`);
        const res = await response.json();
        console.log(res)
        setCity(res.city)
        setCountry(res.country_code)
        //fetches users city and country
    }

    useEffect(() => {
        getLocation().catch((err) =>{console.error(err)});
    })

    return (
        <main className={more ? 'main footer-active' : 'main footer-inactive'}>
            <div className='left-section'>
                <p className={day ? 'morning' : 'evening'}>
                   <img src={day ? sun : moon} alt=''/> Good {day ? 'morning' : 'evening'}, it's currently
                </p>
                <div className='time'>
                    <h2>{time}</h2>
                    <p>{timezone}</p>
                </div>
                <h3>
                    In {city}, {country}
                </h3>
            </div>
            <button className={more ? 'less-button' : 'more-button'} onClick={() => setMore(!more)}>
                {more ? 'Less' : 'More'} <img src={arrow} alt=''/>
            </button>
        </main>
    );
}
 
export default Main;