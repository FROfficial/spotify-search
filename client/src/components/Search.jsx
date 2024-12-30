import '../App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';

import Tabbar from './Tabbar';

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const CLIENT_ID = '457ea21571504c1eab3041b03d6ce905';
    const CLIENT_SECRET = '6cc4b3f08cd34b3ebcd47158ab1626df';
    const REDIRECT_URI = 'http://localhost:3000/search';

    if (code) {
      // Exchange the authorization code for an access token
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setToken(data.access_token);
            window.localStorage.setItem('local_access_token', JSON.stringify(data.access_token))
          } else {
            setError('Failed to get access token');
          }
        })
        .catch((err) => {
          console.error('Error fetching access token:', err);
          setError('Error fetching access token');
        });
    }
  }, []);

  useEffect(() => {
    const active_token = window.localStorage.getItem('local_access_token');
    setToken (JSON.parse(active_token));
  }, [])

  async function search() {
    console.log('Search for ' + searchInput);

    // GET request searching for Artist ID
    var searchParameters = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }
    var artistID = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, searchParameters)
      .then(response => response.json())
      .then(data => { return data.artists.items[0].id })
    // GET request searching with Artist ID for all Albums.
    var albumSearch = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`, searchParameters)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAlbums(data.items)
      })

    // Display Results
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='App'>
        <Tabbar />
        <Container>
          <InputGroup className='mt-3 ' size='lg'>
            <FormControl
              placeholder='Search'
              type='input'
              onKeyDown={event => { if (event.key == 'Enter') { search(); } }}
              onChange={event => setSearchInput(event.target.value)} />
            <Button
              onClick={event => search()}
            >Find Music</Button>
          </InputGroup>

        </Container>
        <Container>
          <Row className='mx-2 row row-cols-4 mt-5'>
            {albums.map((album, i) => {
              return (
                <Card>
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
              )
            })}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Search
