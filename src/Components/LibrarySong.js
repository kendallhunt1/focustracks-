import React from 'react';

const LibrarySong = ({song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs }) => {

    const songSelectHandler = async () => {
        setCurrentSong(song);

        const newSongs = songs.map((song) => {
            // if the 'id' in the song state is equal to the actual id then spread the song array, and set the given equal ids to true, and set leave rest false
            if (song.id === id) {
                return {
                    ...song,
                    active: true
                };
            } else {
                return {
                    ...song,
                    active: false,
                }
            }
        });
        await setSongs(newSongs);
        if(isPlaying) audioRef.current.play();
    }

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            {/* We have access to currentSong and can access the array's data via dot notation */}
            <img src={song.cover} alt={song.name}></img>
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
        </div>
    )
}

export default LibrarySong;