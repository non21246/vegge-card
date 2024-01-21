import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import { useEffect } from 'react';

import '../App.css'
import meme from '../assets/sounds/toothless.m4a'
const Homepage = () => {
    const [play, { pause }] = useSound(meme, { loop: true })
    useEffect(() => {
        play();
      }, [play]);
    return (
        <div className="homepage-container background">
            <div>
            <Link to={`/play`}><button onClick={pause} className='button-center'>Start</button></Link>
            </div>
        </div>
    );
}

export default Homepage;