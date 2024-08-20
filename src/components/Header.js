import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * This component is responsible for displaying the header of the memory game exercise.
 * @returns {JSX.Element}
 * @constructor
 */
function Header() {
    // returns the header:
    return (
        <Container fluid>
            <Row>
                <Col xs={11} md={10} className="bg-secondary-subtle text-dark mb-3">
                    <div>
                        <h1>Memory Game</h1>
                        <p>
                            Click on the cards to flip them, and find matching pairs
                            with as little steps as possible.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;