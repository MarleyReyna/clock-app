import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer'

const App = () => {

  const [more, setMore] = useState(false);
  const [time, setTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [day, setDay] = useState(null);

  const getDay = (hourTime) =>{  //Sets whether its night or day depending on the hour 
    const hour = (hourTime.split(':'))[0];
    if (hour >= 7 && hour < 19){
      setDay(true)
    }
    else{
      setDay(false)
    }
  }

  const getTime = async() =>{
    const response = await fetch(`http://worldtimeapi.org/api/ip`);
    const res = await response.json();
    setTime(((res.datetime.split('T'))[1].split('.'))[0].slice(0, 5))
    getDay(((res.datetime.split('T'))[1].split('.'))[0].slice(0, 5))
    setTimezone(res.abbreviation)
    //fetches time, timezone and calls getDay
  };

  useEffect(() =>{
    getTime().catch(error => {console.error(error)});

    setInterval(getTime, 60000)
  })

  return (
    <div className={more ? 'App more-info' : 'App'} 
    id={day ? 'Daytime' : day === false ? 'Nighttime' : null}>
      <Header 
      more={more}/>
      <Main 
      more={more}
      setMore={setMore}
      time={time}
      timezone={timezone}
      day={day}/>
      <Footer 
      more={more}
      day={day}/>
    </div>
  );
}

export default App;
