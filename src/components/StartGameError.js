import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Link} from 'react-router-dom';
import {Fragment} from "react";

/**
 * This component is responsible for displaying an error page when trying to start the game.
 * This page will be displayed when the rows X columns number is not even.
 * @returns {JSX.Element}
 * @constructor
 */
function StartGameError() {
    // returns the error page:
    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <h1 className="text-danger">Unable to start game</h1>
                        <p>The total number of cards (Rows X Columns) is not even.</p>
                        <Link to="/settings">
                            <Button variant="outline-info" className="mx-1">Change settings</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default StartGameError;