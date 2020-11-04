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
      <div>
        {this.props.artist && this.state.showResults ? (
          <div className="artists">
            <ul>
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
            <Albums albums={this.state.albums} />
          </div>
        ) : this.props.error != undefined ? (
          <div className="alert alert-danger">{this.props.error}</div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Artists;
