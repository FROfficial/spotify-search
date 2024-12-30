import '../App.css';
import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';

function Home() {
    const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize`;
    const CLIENT_ID = '457ea21571504c1eab3041b03d6ce905';
    const REDIRECT_URI = 'http://localhost:3000/search';
    const SCOPES = [
        'user-read-private',
        'user-read-email',
        'playlist-read-private',
        'user-top-read',
        'user-library-read',
    ].join('%20');

    const AUTH_URL = `${SPOTIFY_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&scope=${SCOPES}`;

    const handleLogin = () => {
        console.log(CLIENT_ID);
        console.log(REDIRECT_URI);
        window.location.href = AUTH_URL;
    };

    return (
        <>
            <div>
                <h1>Welcome To Rankify!</h1>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <Button variant='primary' size='lg' onClick={handleLogin}>Login</Button>
            </div>
        </>

    )
}
export default Home