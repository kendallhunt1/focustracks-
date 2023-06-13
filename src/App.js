import React, {useState, useRef} from 'react';
import './Styles/App.css'; 
import Song from './Components/Song';
import Player from './Components/Player';
import data from './Data';
import Library from './Components/Library';
import Nav from './Components/Nav';

function App() {

  // set "songs" state to "data" that we imported from 'util' which has our array of songs
  const [songs, setSongs] = useState(data());

  // set currentSong to the first song in the songs array to be the DEFAULT song when page is loaded
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const audioRef = useRef(null);

  // creation of states that are going to be updated each time the time of the audio element changes (each second)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  })

  // function that runs on timeUpdate event. Sets the states we just defined when this funciton fires
  const timeUpdateHandler = (e) => {
    // Calculate percentage of how much song is finsihed
    const roundedCurrent = Math.round(e.target.currentTime);
    const roundedDuration = Math.round(e.target.duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)
    setSongInfo({...songInfo, 
      currentTime: roundedCurrent, 
      duration: roundedDuration, 
      animationPercentage: animation})
  }

  // When song's duration is over, autoskip to next song
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.addEventListener('canplaythrough', () => {
        audioRef.current.play();
      });
    }
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav 
        libraryStatus={libraryStatus} 
        setLibraryStatus={setLibraryStatus} 
      />
      {/* Passing the Song component a prop of currentSong to make it accessible in the actual Song component (This state is lifted so all children have access to the data from the parents) */}
      <Song currentSong={currentSong} />
      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        setIsPlaying={setIsPlaying} 
        audioRef={audioRef} 
        setSongInfo={setSongInfo} 
        songInfo={songInfo} 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library 
        songs={songs} 
        libraryStatus={libraryStatus} 
        setCurrentSong={setCurrentSong} 
        audioRef={audioRef} 
        isPlaying={isPlaying} 
        setSongs={setSongs} 
      />
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
