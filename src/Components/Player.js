import React from 'react';
import '../Styles/Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleRight, faAngleLeft, faPause } from '@fortawesome/free-solid-svg-icons';

const Player = ({currentSong, setSongInfo, songInfo, isPlaying, setIsPlaying, audioRef, songs, setCurrentSong, setSongs }) => {
    
    // Event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            // if the 'id' in the song state is equal to the actual id then spread the song array, and set the given equal ids to true, and set leave rest false
            if (song.id === nextPrev.id) {
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
        setSongs(newSongs);
    }

    // simple time format function. Can be found anywhere, not unique to this application. Accepts a "time" parameter that is specified in the start end times in JSX
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    // when we are dragging the slider the currentTime of the audioRef is updated to the value of e.target.value
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    const skipTrackHandler = async (direction) => {
        // if song.id state is equal to currentSong.id then that is the index that is what is assigned to currentIndex
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
        } if (direction === 'skip-back') {
            if ((currentIndex - 1) % songs.length === -1){
                await setCurrentSong(songs[songs.length - 1])
                activeLibraryHandler(songs[songs.length - 1])

                // this 'return' ends this function if the if statement is true that way the rest of the function doesn't run and crash the app
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length])
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
        }
        if(isPlaying) audioRef.current.play();
    }

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div
                    style={{ background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`, }}
                    className="track"
                    >
                <input
                    value={songInfo.currentTime}
                    type="range"
                    max={songInfo.duration || 0}
                    min={0}
                    onChange={dragHandler}
                />
                <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-back')} 
                    className="skip-back" 
                    size="2x" 
                    icon={faAngleLeft} 
                />
                {/* ternary operator that says if (?) isPlaying is true then the icon be faPause else (:) icon be faPlay */}
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size="2x" 
                    icon={isPlaying ? faPause : faPlay} 
                />
                <FontAwesomeIcon 
                    onClick={() => skipTrackHandler('skip-forward')} 
                    className="skip-forward" 
                    size="2x" 
                    icon={faAngleRight} 
                />
            </div>
        </div>
    )
}

export default Player;