import React, {useState, useEffect} from 'react';
import './Footer.scss'

const Footer = (props) => {

    const [data, setData] = useState([]);
    const more = props.more;
    const day = props.day;

    useEffect(() =>{
        const abortCont = new AbortController();
    
        fetch(`https://worldtimeapi.org/api/ip`, {signal: abortCont.signal})
          .then((res) => res.json())
          .then((response) =>{
            setData(response)
            console.log('footer')
        }) 
        .catch(err => {
          if(err.name === 'AbortError'){
            console.log('abort')
          }
          console.error(err)
        })
    
        return () => abortCont.abort();
        //fetches extra information each time the state of 'more' is updated to true
      }, [more]);

    return (
        <footer className={more ? 'footer active' : 'footer'} id={day ? 'daytime-footer' : 'nighttime-footer'}>
            <ul>
                <li>
                    <h4>Current Timezone</h4>
                    <p>{data.timezone}</p>
                </li>
                <li className='border-left'>
                    <h4>Day of the week</h4>
                    <p>{data.day_of_week}</p>
                </li>
                <li>
                    <h4>Day of the year</h4>
                    <p>{data.day_of_year}</p>
                </li>
                <li className='border-left'>
                    <h4>Week number</h4>
                    <p>{Math.floor(data.day_of_year / 7)}</p>
                </li>
            </ul>
        </footer>
    );
}
 
export default Footer;