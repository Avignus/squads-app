import React from 'react';
import styles from './Albums.css';


class Albums extends React.Component {

    render() {

        return (

            <div className={styles.albums}>
                {this.props.albums ?
                    <div>
                        <div className="albums">
                            {this.props.albums.map((place, index) => {
                                if (place.name != '(null)') {
                                    const $img = place.image[3]["#text"] || 'https://ru-coin.com/market/logo/empty-logo.jpg';
                                    return <div className="album">
                                        <h2>{place.name}</h2>
                                        <img src={$img} alt=""/>
                                    </div>

                                }
                            })}

                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}

export default Albums;
