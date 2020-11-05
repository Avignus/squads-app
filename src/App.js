import React from 'react';
import Search from './Components/Search';
import ArtistsAndAlbums from './Components/ArtistsAndAlbums';
import { apiKey } from './api_key.js';
import { Redirect } from 'react-router-dom';
import './Components/Styles/Artists.css';
import api from './Config/api';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      tasks: [],
      searches: [],
      idSearches: '',
      artists: '',
      albums: '',
      pageFirstLoaded: true,
      error: undefined,
    };
  }

  componentDidMount() {
    this.gettingData();
  }

  gettingData = async (newSearch) => {
    let listSearches = [];
    let token = localStorage.getItem('token');
    api.defaults.headers.common = { Authorization: `bearer ${token}` };

    api
      .get('/projects')
      .then((res) => {
        console.log(res.data.projects[0], 'projeto');
        const searches = res.data.projects[0].tasks;
        const id = res.data.projects[0]._id;
        console.log(searches);
        this.setState({ suggestions: searches });
        console.log(this.state.suggestions);
        if (this.state.pageFirstLoaded) {
          return false;
        }
        // searches.push({ title: 'nova task 1', assignedTo: 'igor' });
        searches.push({ title: newSearch, assignedTo: id });
        const newObjSearch = {
          title: 'Login',
          description: 'Para salvar o histórico de pesquisa',
          tasks: [searches],
        };

        this.settingData(newObjSearch, id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  settingData = async (newTask, idUser) => {
    console.log(newTask);
    let token = localStorage.getItem('token');
    api.defaults.headers.common = { Authorization: `bearer ${token}` };

    await api
      .put(`/projects/${idUser}`, newTask)
      .then((res) => {
        let token = localStorage.getItem('token');
        api.defaults.headers.common = { Authorization: `bearer ${token}` };
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  gettingArtists = async (e) => {
    this.setState({ albums: '', pageFirstLoaded: false });
    e.preventDefault();
    const artist = e.target.elements.artist.value;

    if (artist) {
      const api_url = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artist}&api_key=${apiKey}&format=json`
      );
      const data = await api_url.json();
      console.log(data);
      console.log(data.results.artistmatches.artist[0]);
      // const nameSearched = data.results.artistmatches.artist[0].name;
      this.gettingData(artist);
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

  gettingAlbums = async (e) => {
    this.setState({ artists: '', pageFirstLoaded: false });
    e.preventDefault();
    const album = e.target.elements.album.value;
    const api_url = await fetch(
      `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${album}&api_key=${apiKey}&format=json`
    );
    const data = await api_url.json();
    console.log(data.results.albummatches.album[0]);
    this.gettingData(album);
    if (data.results.albummatches.album[0] != '') {
      this.setState({
        albums: data.results.albummatches.album,
      });
      console.log(this.state.albums);
    } else {
      this.setState({
        albums: '',
        error: 'Nada encontrado',
      });
    }
  };

  render() {
    if (localStorage.getItem('token') < 1) {
      return <Redirect push to={'/'} />;
    }
    return (
      <div className="container-artists">
        <div className="list-artists ml-5">
          <Search
            getAlbum={this.gettingAlbums}
            getArtist={this.gettingArtists}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              justifyContent: 'start',
            }}
          >
            {this.state.artists.length > 0 ? (
              <ArtistsAndAlbums
                artist={this.state.artists}
                error={this.state.error}
              />
            ) : this.state.albums.length > 0 ? (
              <ArtistsAndAlbums
                albums={this.state.albums}
                error={this.state.error}
              />
            ) : (
              <div style={{ height: 1200 }}></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
