import React from 'react';
import Search from './Components/Search';
import Artists from './Components/Artists';
import { apiKey } from './api_key.js';

class App extends React.Component {
  state = {
    artists: undefined,
    error: undefined,
  };

  gettingAlbums = async (e) => {
    e.preventDefault();
    const artist = e.target.elements.artist.value;

    if (artist) {
      const api_url = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${apiKey}&format=json`
      );
      const data = await api_url.json();
      console.log(data.results.artistmatches.artist[0]);
      if (data.results.artistmatches.artist[0] != undefined) {
        this.setState({
          artists: data.results.artistmatches.artist,
        });
      } else {
        this.setState({
          artists: undefined,
          error: 'Nada encontrado',
        });
      }
    }
  };

  render() {
    return (
      <div className="ml-5">
        <a href="/" className="ml-4">
          Para o principal
        </a>
        <Search getArtist={this.gettingAlbums} />
        <Artists artist={this.state.artists} error={this.state.error} />
      </div>
    );
  }
}

export default App;
