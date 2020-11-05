import React from 'react';
import Albums from './Albums';
import Search from './Search';
import { apiKey } from '../api_key.js';

class Artists extends React.Component {
  state = {
    albums: undefined,
    showResults: this.props.showResults == false ? false : true,
    error: this.props.error,
  };
  back = () => {
    this.setState({
      showResults: true,
    });
  };
  gettingAlbums = async (e) => {
    e.preventDefault();
    const artist = e.target.innerHTML;
    if (artist) {
      const api_url = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${apiKey}&format=json`
      );
      const data = await api_url.json();
      this.setState({
        albums: data.topalbums.album,
        showResults: this.props.showResults,
      });
    }
  };

  render() {
    return (
      <div style={{ paddingRight: 80 }}>
        {this.props.artist && this.state.showResults ? (
          <div className="artists">
            <ul style={{ listStyle: 'none' }}>
              {this.props.artist.map((place, index) => (
                <li>
                  <button
                    className="btn btn-info mt-1 mb-1"
                    key={index}
                    onClick={this.gettingAlbums}
                  >
                    {place.name}
                  </button>
                </li>
              ))}

              <Albums albums={this.state.albums} />
            </ul>
          </div>
        ) : this.props.artist ? (
          <div>
            <button onClick={this.back} className="btn btn-primary ml-4">
              Voltar para pesquisar
            </button>
            <div
            // style={{
            //   width: '100%',
            //   display: 'flex',
            //   flexWrap: 'wrap',
            //   alignItems: 'center',
            //   justifyContent: 'space-around',
            // }}
            >
              <Albums albums={this.state.albums} />
            </div>
          </div>
        ) : this.props.error != undefined ? (
          <div className="alert alert-danger">{this.props.error}</div>
        ) : this.props.albums ? (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ul
              style={{
                width: '100%',
                listStyle: 'none',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-evenly',
              }}
            >
              {this.props.albums.map((place, index) => (
                <li
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    style={{ width: 200, height: 200 }}
                    src={Object.values(place.image[2])}
                  />
                  <button
                    className="btn btn-info mt-1 mb-1"
                    key={index}
                    onClick={this.gettingAlbums}
                    style={{
                      backgroundColor: 'transparent',
                      width: 150,
                      height: 80,
                      borderColor: 'transparent',
                    }}
                  >
                    {place.name}
                  </button>
                </li>
              ))}

              <Albums albums={this.state.albums} />
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Artists;
