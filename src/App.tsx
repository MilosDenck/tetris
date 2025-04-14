import React, { useRef, useState } from 'react';
import './App.css';
import { usePlayField } from './PlayField';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/solid'
import NextShapeComponent from './NextShapeComponent';
import { useMusicPlayer } from './MusicPlayer';

function App() {
  const {playField, points, play, nextShape, gameLost, gamePaused, startNewGame} = usePlayField()

  const { isMusicPlaying, handlePlay, handleStop } = useMusicPlayer()
 
  return (
    <div className="App">
      <div className='container'>
      <div className="play-field-container" style={{border: "1px solid black", width: "fit-content"}} >
      { !play ?
          <div className="overlay">
            {
              gamePaused ? 
                  <h2> PAUSE </h2>: null
            }
            {
              gameLost ? 
              <div className="start-screen">
                <h2> GAME OVER  </h2>
                <button onClick={() => startNewGame()}>start game</button>
              </div> : null
            }
            {
              !(gameLost || gamePaused) ? 
              
              <div className="start-screen">
                <h2> WELCOME </h2>
                <button onClick={() => {startNewGame(true); handlePlay()}}>start game</button>
              </div> : null
            }
          </div>  : null
      }

      <div className='play-field'>
        {playField.map(row => 
          <div style={{display: "flex"}}>
            {
              row.map(fieldElement => 
                fieldElement === 0 ?
                  <div style={{width: 32, margin:0, padding:0, boxSizing: "border-box", height:32, border: "1px solid white"}} /> :
                  <div style={{width: 32, margin:0, padding:0, boxSizing: "border-box", height:32, border: "1px solid white", backgroundColor: "black"}} /> 
              )
            }

          
          </div>
          
        )}
      </div>
      </div>
      <div className="info-card">
        <div style={{fontSize: 15, marginBottom: "10px"}}>Milos' Tetris Game</div>
        
        
        
        <NextShapeComponent shape={nextShape} />
        <div className='points'>
          <div >Points: {points}</div>
          {
          isMusicPlaying ?
          <SpeakerXMarkIcon onClick={() => handleStop()} style={{width: "50px"}} />: <SpeakerWaveIcon onClick={() => handlePlay()} style={{width: "50px"}} />
        }
        </div>
        
      </div>
      </div>
    </div>
  );
}

export default App;
