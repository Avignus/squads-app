import React from 'react';
import styles from './Styles/Search.css';

class Search extends React.Component {
  state = {
    type: 'Artista',
    artist: '',
    album: '',
    suggestions: [],
    showResults: true,
  };
  SearchArtist = async (e) => {
    this.setState({
      artist: e.target.value,
      showResults: true,
    });
  };

  SearchAlbum = async (e) => {
    this.setState({
      album: e.target.value,
      showResults: true,
    });
  };

  suggestionSelected = (value) => {
    // setSuggestions([]);
    // setText(value);
  };

  renderSuggestions = () => {
    if (this.state.suggestions.length === 0) {
      return null;
    }
    return (
      <div className="AutoCompleteText">
        <ul style={{ marginTop: -20 }}>
          {this.state.suggestions.map((item) => (
            <li
              style={{ fontFamily: 'Montserrat' }}
              // onClick={() => suggestionSelected(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  componentDidUpdate() {
    console.log(this.state.type);
  }
  render() {
    return (
      <div>
        <form
          onSubmit={
            this.state.type === 'Artista'
              ? this.props.getArtist
              : this.props.getAlbum
          }
          className="input-group mb-3 "
        >
          <select
            style={{ height: 80, marginRight: 50, fontSize: 18 }}
            className="input-search"
            onChange={(e) => this.setState({ type: e.target.value })}
          >
            <option>Artista</option>
            <option>Álbum</option>
          </select>
          {this.state.type === 'Artista' ? (
            <div>
              <input
                className="input-search"
                type="text"
                onChange={this.SearchArtist}
                name="artist"
                placeholder="Artista"
              />
              {this.renderSuggestions()}
              <button
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
                className="btn button-search"
              >
                Pesquisar artista
              </button>
            </div>
          ) : (
            <div>
              <input
                className="input-search"
                type="text"
                onChange={this.SearchAlbum}
                name="album"
                placeholder="Álbum"
              />
              <button
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
                className="btn button-search"
              >
                Pesquisar álbum
              </button>
            </div>
          )}
          {/* <input
            className={styles.input}
            type="text"
            onChange={this.SearchArtist}
            name="artist"
            placeholder="Artista"
          />
          <button className="btn btn-success">
            Pesquisa {this.state.artist}
          </button> */}
        </form>
      </div>
    );
  }
}

export default Search;
