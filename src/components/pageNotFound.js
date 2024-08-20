import Container from 'react-bootstrap/Container';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

/**
 * This component is responsible for displaying an error page when the url is invalid.
 * @returns {JSX.Element}
 */
function pageNotFound() {
    // returns the error page, with a button directing to the main page:
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1>Page not found!</h1>
                    <p>
                        The address you are trying to reach is invalid.
                    </p>
                    <Link to="/"><Button variant="warning" className="mx-1">Go to the main page</Button></Link>
                </Col>
            </Row>
        </Container>
    );
}

export default pageNotFound;