import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import HighScoresTable from "./HighScoresTable";

/**
 * This component is for displaying the "game over" page after the player won the game.
 * @param steps - the number of steps it took the player to win.
 * @param cardsNum - the number of cards of the game.
 * @param playerName - the player name
 * @returns {JSX.Element}
 * @constructor
 */
function GameOver({steps, cardsNum, playerName}) {
    // getting the rank of the player:
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const sortedScores = [...leaderboard].sort((a, b) => b.score - a.score);
    const playerRank = sortedScores.findIndex(player => player.name === playerName.toLowerCase());

    // returns the game over page:
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Game Over!</h1>
                    <p>Congratulations, {playerName}! You won!! :)</p>
                    <p>Number of cards played: {cardsNum}</p>
                    <p>Number of steps: {steps}</p>
                    <p>Score: {sortedScores[playerRank].score} , Rank: {playerRank + 1}</p>
                </Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <HighScoresTable/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to="/"><Button variant="primary" className="my-3 mx-1">Ok</Button></Link>
                </Col>
            </Row>
        </Container>

    );
}

export default GameOver;