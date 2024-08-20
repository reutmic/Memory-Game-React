import {Link, useNavigate} from 'react-router-dom';
import {Outlet} from "react-router";
import Button from "react-bootstrap/Button";
import {Fragment, useState} from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import HighScoresTable from "./HighScoresTable";


/**
 * This component is responsible for displaying the game menu.
 * @param playerName - state that holds the player's name.
 * @param setName - the setter of the player's name state.
 * @returns {JSX.Element}
 * @constructor
 */
function Menu({playerName, setName}) {
    const navigate = useNavigate();

    // for the high scores modal:
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);


    /**
     * This function checks the validation of the player's name input:
     * @returns {boolean} - returns 'true' if the name is valid. else - returns 'false'.
     */
    function playerNameValidation() {
        const regex = new RegExp("^[a-zA-Z0-9]+$");
        const trimmedPlayerName = playerName.trim();

        return regex.test(trimmedPlayerName) && trimmedPlayerName.length >= 1 &&
            trimmedPlayerName.length <= 12;
    }



    /**
     * This function handles the user's input changes in the "name" field.
     * @param event - when a change in this field occurs.
     */
    function handleInputChanges(event) {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "playerName":
                setName(value);
                break;
            default:
                break;
        }
    }

    ///////////

    /**
     * This function handles the "submit" action of the form:
     * @param event - the submission of the form.
     */
    function handleSubmit(event) {
        event.preventDefault();

        if (!playerNameValidation()) {
            alert(`Player name ${playerName.trim()} is not valid. Please change your player name.`);
        }

        else {
            navigate("/play");
        }
    }



    // returns the menu page:
    return(
        <>
            <Container fluid>
                <Row>
                    <Col xs={6} sm={5} md={4} lg={3}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Label htmlFor="nameInput">Your name:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="playerName"
                                value={playerName || ""}
                                placeholder="Name"
                                onChange={handleInputChanges}
                                maxLength={12}
                                id="nameInput"
                                aria-describedby="nameHelpBlock"
                            />
                            <Form.Text id="playerNameHelpBlock" muted>
                                Your name must be 1-12 characters long, and should include letters
                                and numbers only.
                            </Form.Text>

                            <Row>
                                <Col xs={12}>
                                    <Button variant="primary" type="submit" className="mt-2 mx-1">Play</Button>
                                    <Link to="/settings">
                                        <Button variant="outline-secondary" className="mt-2 mx-1">Settings</Button>
                                    </Link>
                                    <Button variant="outline-dark" onClick={handleShowModal} className="mt-2 mx-1">
                                        High Scores
                                    </Button>

                                    <Modal show={showModal} onHide={handleCloseModal}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Leaderboard</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <HighScoresTable/>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseModal}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <Outlet/>
        </>
    );
}

export default Menu;