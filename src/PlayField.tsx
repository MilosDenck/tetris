import { useEffect, useState } from "react";
import { Tetromino } from "./Tetromino";


export const usePlayField = () => {
    const[playField, setPlayField] = useState(Array.from({ length: 20 }, () => Array(10).fill(0))) 
    const[tetromino, setNewTetromino] = useState(new Tetromino(Math.floor(Math.random() * 6)))
    const[points, setPoints] = useState(0)
    const[play, setPlay] = useState(false)
    const[nextShape, setNextShape] = useState(Math.floor(Math.random() * 6))
    const[multiplicator, setMultiplicator] = useState(1)
    const[gameLost, setGameLost] = useState(false)
    const[gamePaused, setGamePaused] = useState(false)
    

    const moveTetromino = (tetromino: Tetromino) => {
        setPlayField(prev => {

            let copy: number[][] = prev.map(row => row.map(value => value === 2 ? 0 : value))
            tetromino.stones.forEach(stone => {
                copy[stone.y][stone.x] = 2;
            })
            return copy
          });
    };

    const moveLeft = () => {
        setNewTetromino(prevTetromino => {
          const newTetro = prevTetromino.clone(); 
          
      
          setPlayField(prev => {
            newTetro.moveLeft(prev);
            const copy = prev.map(row => row.map(value => (value === 2 ? 0 : value)));
      
            newTetro.stones.forEach(stone => {
              copy[stone.y][stone.x] = 2;
            });
      
            return copy; 
          });
      
          return newTetro;
        });
    };

    const moveRight = () => {
        setNewTetromino(prevTetromino => {
          const newTetro = prevTetromino.clone(); 
          
      
          setPlayField(prev => {
            newTetro.moveRight(prev); 
            const copy = prev.map(row => row.map(value => (value === 2 ? 0 : value)));
      
            newTetro.stones.forEach(stone => {
              copy[stone.y][stone.x] = 2;
            });
      
            return copy;
          });
      
          return newTetro;
        });
    };

    const pause = () =>{
        setPlay(play => {
            return !play
        })
        setGamePaused(play)

    }

    const moveDown = () => {
        setNewTetromino(prevTetromino => {
            const newTetro = prevTetromino.clone(); 
            
        
            setPlayField(prev => {
                if(newTetro.isMoveDownPossible(prev)){
                    newTetro.moveDown()
                }
                const copy = prev.map(row => row.map(value => (value === 2 ? 0 : value)));
            
                newTetro.stones.forEach(stone => {
                    copy[stone.y][stone.x] = 2;
                });
        
              return copy;
            });
        
            return newTetro;
        });
    }

    const rotate = () => {
        setNewTetromino(prevTetromino => {
            const newTetro = prevTetromino.clone(); 
            
        
            setPlayField(prev => {
                newTetro.rotate(prev); 
                const copy = prev.map(row => row.map(value => (value === 2 ? 0 : value)));
        
                newTetro.stones.forEach(stone => {
                copy[stone.y][stone.x] = 2;
              });
        
              return copy;
            });
        
            return newTetro;
          });
    }

    const setTetromino = (tetromino: Tetromino) => {
        setPlayField(prev => {
            const copy = JSON.parse(JSON.stringify(prev))
            if(tetromino.isGameLost(prev)){
                setGameLost(true)
                setPlay(false)
            }else{
                tetromino.stones.forEach(stone => {
                    copy[stone.y][stone.x] = 2;
                })
            }
            return copy
        })
    };

    const startNewGame = (newGame: boolean = false) => {
        setPlayField(Array.from({ length: 20 }, () => Array(10).fill(0)))
        if(!newGame){
            setNewTetromino(new Tetromino(Math.floor(Math.random() * 6)))
            setNextShape(Math.floor(Math.random() * 6))
        }
        setPoints(0)
        setPlay(true)
        setMultiplicator(1)
        setGameLost(false)
        setGamePaused(false)
    }

    const addToField = (tetromino: Tetromino) => {
        setPlayField(prev => {
            let copy: number[][] = prev.map(row => row.map(value => value === 2 ? 0 : value))
            tetromino.stones.forEach(stone => {
                copy[stone.y][stone.x] = 1;
            })
            copy.map((row, index) => {
                if(row.every(elem => elem === 1)){
                    setPoints(points => {return points +=100})
                    for (let x = index-1; x >= 0; x--) {
                        for (let y = 0; y < 10; y++) {
                          copy[x + 1][y] = copy[x][y];
                        }
                      }
                    
                      for (let y = 0; y < 10; y++) {
                        copy[0][y] = 0;
                      }
                }
                return 0;
            })

            return copy

        })
    }

    const handleKeyDown = (event:KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowLeft':
                moveLeft()
                break;
            case 'ArrowRight':
                moveRight()
                break;
            case 'ArrowDown':
                moveDown()
                break;
            case 'ArrowUp':
                rotate()
                break;
            default:
                break;
        }
    }

    const handlePauseKey = (event:KeyboardEvent) => {
        switch (event.key) {
            case ' ':
                pause()
                break;
            default:
                break;
        }
    }
    
    useEffect(() => {
        if(play){
            window.addEventListener('keydown', handleKeyDown);
        }
        if(!gameLost && !(!play && !gamePaused)){
            window.addEventListener('keydown', handlePauseKey);
        }
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keydown', handlePauseKey);
        }
    }, [play, gameLost, gamePaused])

    useEffect(() => {
        setTetromino(tetromino);
    })
      

    useEffect(() => {
        const interval = setInterval(() => {
            if(play){
                setPlayField(prev => {
                    setNewTetromino(prevTetr => {
                        let newTetro = prevTetr.clone()
                        if(prevTetr.isMoveDownPossible(prev)){                     
                            newTetro.moveDown();
                            moveTetromino(newTetro);
                        }else{
                            addToField(newTetro)
                            newTetro = new Tetromino(nextShape)
                            setNextShape(Math.floor(Math.random() * 6))
                            setTetromino(newTetro)
                            setMultiplicator(prevMult => {
                                return prevMult + 0.05
                            }) 
                        }
                        return newTetro
                    })
                    setPoints(points => points+=1)
                    return prev
                })
            }
        }, 1000/multiplicator);
      
        return () => clearInterval(interval); 

    }, [multiplicator, play]);

    return {playField, points, play, nextShape, gamePaused, gameLost, startNewGame}
}