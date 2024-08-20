import Row from "react-bootstrap/Row";
import GameCard from "./GameCard";

/**
 * This component is responsible for creating a row of cards for the game.
 * @param delay - time delay of the game
 * @param cardImages - an array of the cards images
 * @param clickedCards - an array of the cards that have been clicked on.
 * @param setClickedCards - a setter for state 'clickedCards'
 * @param isClickable - a boolean that determines whether a card can be clicked on or not.
 * @param setClickable - a setter for the state 'isClickable'
 * @param setSteps - a setter for the number of steps
 * @param setMatchedPairs - a setter for the number of matched pairs of cards
 * @returns {JSX.Element}
 * @constructor
 */
function CardsRow({delay, cardImages, clickedCards, setClickedCards, isClickable, setClickable, setSteps,
                      setMatchedPairs}) {
    // creating and returning a row of cards:
    return (
      <Row className="my-2">
          {cardImages.map((image, index) => (
              <GameCard
                  key={index}
                  delay={delay}
                  image={image}
                  clickedCards={clickedCards}
                  setClickedCards={setClickedCards}
                  isClickable={isClickable}
                  setClickable={setClickable}
                  setSteps={setSteps}
                  setMatchedPairs={setMatchedPairs}
              />
          ))}
      </Row>
    );
}

export default CardsRow;