// import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import PlayGame from "./components/PlayGame";
import GameSettings from "./components/GameSettings";
import PageNotFound from "./components/pageNotFound";


/**
 * This is the main app file that is responsible for the routing and leaderboard initialization.
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const [playerName, setName] = useState('');
    const [rows, setRows] = useState(4);
    const [cols, setCols] = useState(4);
    const [delay, setDelay] = useState(0.5);

    // initializing the leaderboard and saving it in the local storage:
    useEffect(() => {
        if (!localStorage.getItem('leaderboard')) {
            let scoresArray = [];
            localStorage.setItem('leaderboard', JSON.stringify(scoresArray));
        }
    }, []);

  return (
      <>
        <Header/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu
            playerName={playerName}
            setName={setName}
            />}
            >
              <Route path="/settings" element={<GameSettings
              rowsNum={rows}
              rowsNumSetter={setRows}
              colsNum={cols}
              colsNumSetter={setCols}
              timeDelay={delay}
              timeDelaySetter={setDelay}
                 />}
              />
            </Route>
              <Route path="/play" element={<PlayGame
                  rowsNum={rows}
                  colsNum={cols}
                  timeDelay={delay}
                  playerName={playerName}
                />}
              />
              <Route path={"*"} element={<PageNotFound/>} />
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
