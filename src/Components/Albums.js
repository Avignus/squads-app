import React from 'react';
import styles from './Styles/Albums.css';

class Albums extends React.Component {
  render() {
    return (
      <div className={styles.albums}>
        {this.props.albums ? (
          <div>
            <h1>{this.props.albums[0].artist.name}</h1>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
              }}
              className="albums"
            >
              {this.props.albums.map((place, index) => {
                if (place.name != '(null)') {
                  const $img =
                    place.image[3]['#text'] ||
                    'https://ru-coin.com/market/logo/empty-logo.jpg';
                  return (
                    <div
                      style={{
                        padding: 10,
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                      }}
                      className="album"
                    >
                      <img
                        style={{ width: 250, height: 200 }}
                        src={$img}
                        alt=""
                      />
                      <span
                        style={{
                          width: 100,
                          height: 100,
                          fontSize: 22,
                          textAlign: 'center',
                        }}
                      >
                        {place.name}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Albums;
