import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import {useState} from "react";

/**
 * This component is responsible for creating a game card.
 * @param delay - time delay of the game
 * @param image - the image url of the card
 * @param clickedCards - an array of the cards that have been clicked on.
 * @param setClickedCards - a setter for state 'clickedCards'
 * @param isClickable - a boolean that determines whether a card can be clicked on or not.
 * @param setClickable - a setter for the state 'isClickable'
 * @param setSteps - a setter for the number of steps
 * @param setMatchedPairs - a setter for the number of matched pairs of cards
 * @returns {JSX.Element}
 * @constructor
 */
function GameCard({delay, image, clickedCards, setClickedCards, isClickable, setClickable, setSteps,
                      setMatchedPairs}) {
    // a boolean to determine whether the card has been clicked on:
    const [clickedOn, setClickedOn] = useState(false);

    // a boolean to determine whether the card has been matched:
    const [matchFound, setMatchFound] = useState(false);


    /**
     * This function is for handling the click event of the card.
     */
    const handleClick = () => {
        // checking if the player can click on the card according to the current card's state in the game:
        if (!isClickable || clickedOn || matchFound) {
            return;
        }

        // adding the card to the clickedCards array:
        const updatedClickedCards = [...clickedCards, {image, setClickedOn: setClickedOn}];
        setClickedOn(true);
        setClickedCards(updatedClickedCards);

        // increase the number of steps:
        setSteps(steps => steps + 1);

        // if the player clicked on two cards (and revealed two cards images):
        if (updatedClickedCards.length === 2) {
            // checking if the cards images match:
            if (updatedClickedCards[0].image === updatedClickedCards[1].image) {
                setMatchFound(true);
                setClickedCards([]);
                setMatchedPairs(matchedNum => matchedNum + 1);
            }

            else {  // if the cards images do not match, execute the time delay:
                setClickable(false);

                setTimeout(() => {
                    updatedClickedCards.forEach(card => card.setClickedOn(false));
                    setClickedCards([]);
                    setClickable(true);
                }, delay*1000);
            }
        }
    }

    //////

    // returns the game card:
    return (
        <Col xs={2}>
            <Card onClick={handleClick}>
                <Card.Body>
                    <Card.Img src={clickedOn ? image : "images/card.jpg"}
                              alt="Card image"/>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default GameCard;