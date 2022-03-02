import React, { useState } from 'react';
import './Header.scss';
import refresh from './icon-refresh.svg'

const Header = (props) => {

    const more = props.more;
    const [quote, setQuote] = useState('“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”')
    const [auth, setAuth] = useState('Ada Lovelace')

    const getRandomQuote = async() =>{
        const response = await fetch(`https://programming-quotes-api.herokuapp.com/Quotes/random`);
        const res = await response.json();
        setQuote(res.en)
        setAuth(res.author)
        //fetches random quote each time the refresh button is pressed
    }

    return (
        <header className={more ? 'header inactive' : 'header'}>
            <div>
                <p>
                    {quote}
                </p>
                <button onClick={() => getRandomQuote().catch((err) =>{console.error(err)})}>
                    <img src={refresh} alt='' />
                </button>
            </div>
            <h1>{auth}</h1>
        </header>
    );
}
 
export default Header;