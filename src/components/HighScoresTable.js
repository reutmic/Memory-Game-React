import {Fragment} from "react";
import Table from "react-bootstrap/Table"


/**
 * This component is for creating the high scores table.
 * @returns {JSX.Element}
 * @constructor
 */
function HighScoresTable() {
    // getting and sorting the scores data:
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const sortedScores = [...leaderboard].sort((a, b) => b.score - a.score);

    // returns the scores table:
    return (
      <>
          <Table striped bordered hover>
              <thead>
              <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Score</th>
              </tr>
              </thead>
              <tbody>
              {sortedScores.map((player, index) => (
                  <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{player.name}</td>
                      <td>{player.score}</td>
                  </tr>
              ))}
              </tbody>
          </Table>
      </>
    );
}

export default HighScoresTable;