import { Link } from 'react-router-dom';
import '../App.css'

const Homepage = () => {
    return (
        <div className="homepage-container background">
            <div>
            <Link to={`/play`}><button className='button-center'>Start</button></Link>
            </div>
        </div>
    );
}

export default Homepage;