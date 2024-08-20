import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Fragment, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardsRow from "./CardsRow";
import GameOver from "./GameOver";
import StartGameError from "./StartGameError";

/**
 * This function initializes the cards' images array.
 * @param rowsNum - the number of rows the user chose in the settings.
 * @param colsNum - the number of columns the user chose in the settings.
 * @returns {*[]} - returns the images array.
 */
const initializeCardImages = (rowsNum, colsNum) => {
    const numOfCards = rowsNum * colsNum;
    let images = [];

    // inserting images according to the number of cards:
    for (let imgIndex = 0 ; imgIndex < (numOfCards / 2) ; imgIndex++) {
        images.push(`images/${imgIndex}.jpg`);
        images.push(`images/${imgIndex}.jpg`);
    }

    // using the Fisher-Yates method to shuffle the array:
    for (let i = images.length - 1 ; i > 0 ; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = images[i];
        images[i] = images[j];
        images[j] = k;
    }

    return images;
};

/////////

/**
 * This function is for validating the game board size. It checks if the number of cards in even.
 * @param rowsNum - the number of rows the user chose in the settings.
 * @param colsNum - the number of columns the user chose in the settings.
 * @returns {boolean} - returns true if the number of cards is even, else - returns false.
 */
const boardGridValidator = (rowsNum, colsNum) => {
    return (rowsNum * colsNum) % 2 !== 0;
}

/////////




/**
 * This function calculates the player's score after they finish the game successfully.
 * @param cardsNum - the number of cards.
 * @param steps - the number of steps it took the player played to finish.
 * @param delay - the time delay the user chose in the settings.
 * @returns {number} - returns the player's score.
 */
const calculateScore = (cardsNum, steps, delay) => {
    let score = cardsNum * (cardsNum / 2);
    let stepsCounter = steps - cardsNum;
    while (stepsCounter > 0 && score > cardsNum) {
        if ((delay < 1.5)) {
            score --;
        }
        else {
            score -= 2;
        }
        stepsCounter --;
    }

    return score;
}

/////////


/**
 * This component is responsible for displaying the game page (the game board).
 * @param rowsNum - the number of rows the user chose in the settings.
 * @param colsNum - the number of columns the user chose in the settings.
 * @param timeDelay - the delay the user chose in the settings.
 * @param playerName - the player name
 * @returns {JSX.Element} - returns the PlayGame page.
 * @constructor
 */
function PlayGame({rowsNum, colsNum, timeDelay, playerName}) {
    const [clickedCards, setClickedCards] = useState([]);    // array of clicked-on cards
    const [isClickable, setClickable] = useState(true);     // boolean for enabling clicking on cards

    // initializing an array of shuffled images for the cards:

    const [cardImages, setCardImages] = useState(() => initializeCardImages(rowsNum, colsNum));
    // const cardImages = initializeCardImages(rowsNum, colsNum);

    const [steps, setSteps] = useState(0);      // to count the steps
    const [matchedPairs, setMatchedPairs] = useState(0);    // to count the pairs that has been found

    const cards = [];  // for creating the game cards

    // for unused state setter:
    const num = 0;
    if (num > 1) {
        setCardImages([]);
    }
    //

    // checks if the number of cards is even. If not, returns an error page:
    if (boardGridValidator(rowsNum, colsNum)) {
        return <StartGameError/>
    }


    // defining the board's card rows:
    let cardIndex = 0;
     for (let rowKey = 0 ; rowKey < rowsNum ; rowKey++) {
         const rowImages = cardImages.slice(cardIndex, cardIndex + parseInt(colsNum, 10));
         cards.push(
            <CardsRow
                key={rowKey}
                delay={timeDelay}
                cardImages={rowImages}
                clickedCards={clickedCards}
                setClickedCards={setClickedCards}
                isClickable={isClickable}
                setClickable={setClickable}
                setSteps={setSteps}
                setMatchedPairs={setMatchedPairs}
            />
         );

         cardIndex += parseInt(colsNum, 10);
     }


     // checking if the user found all the cards pairs and won the game:
    if (matchedPairs === (rowsNum * colsNum) / 2) {
        // calculating the player's score:
        const score = calculateScore(rowsNum * colsNum, steps, timeDelay);
        const newScore = { name: playerName.toLowerCase(), score: score };
        const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

        // checks if the player already exists in the leaderboard:
        const playerExists = leaderboard.findIndex(player => player.name === newScore.name);


        // adding the new score to the leaderboard:
        if ((playerExists !== -1)) {
            leaderboard[playerExists].score = Math.max(newScore.score, leaderboard[playerExists].score);
        }
        else {
            leaderboard.push(newScore);
        }

        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));


        // returns the GameOver page:
        return (
            <GameOver
                cardsNum={rowsNum * colsNum}
                steps={steps}
                playerName={playerName}
            />
        );
    }


    // returns the PlayGame page:
    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <p>Steps: {steps}</p>
                        <p>Matched pairs: {matchedPairs}</p>
                    </Col>
                </Row>
                {cards}
                <Row>
                    <Col>
                        <Link to="/"><Button variant="danger" className="my-3 mx-1">Abandon</Button></Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default PlayGame;