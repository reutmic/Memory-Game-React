import {Fragment} from "react";
import Form  from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * This component is responsible for displaying and updating the game settings.
 * @param rowsNum - number of rows
 * @param rowsNumSetter - number of rows setter
 * @param colsNum - number of columns
 * @param colsNumSetter - number of columns setter
 * @param timeDelay - delay
 * @param timeDelaySetter - delay setter
 * @returns {JSX.Element}
 * @constructor
 */
function GameSettings({rowsNum, rowsNumSetter, colsNum, colsNumSetter, timeDelay, timeDelaySetter}) {
    // checking that the number of cards is valid:
    const rowsColsValidator = ((rowsNum * colsNum) % 2) !== 0;

    /**
     * This function handles the changes in the input categories of the settings page.
     * @param event - when a change occurs.
     */
    function handleInputChanges(event) {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "rows":
                rowsNumSetter(value);
                break;
            case "cols":
                colsNumSetter(value);
                break;
            case "delay":
                timeDelaySetter(value);
                break;
            default:
                break;
        }
    }

    // returns the settings page:
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Form.Label htmlFor="rowsInput">Select number of rows:</Form.Label>
                        <Form.Select
                            aria-label="Rows selection"
                            onChange={handleInputChanges}
                            id="rowsInput"
                            value={rowsNum || 4}
                            name="rows">
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Label htmlFor="colsInput">Select number of columns:</Form.Label>
                        <Form.Select
                            aria-label="Cols selection"
                            onChange={handleInputChanges}
                            id="colsInput"
                            value={colsNum || 4}
                            name="cols">
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Select>
                    </Col>
                </Row>
                {rowsColsValidator && (
                    <Row>
                        <Col md={4}>
                            <div className="alert alert-danger mt-2" role="alert">
                                The total number of cards should be even.
                            </div>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col md={2}>
                        <Form.Label htmlFor="delayInput">Choose delay (in seconds):</Form.Label>
                        <Form.Select
                            aria-label="Seconds delay selection"
                            onChange={handleInputChanges}
                            id="delayInput"
                            value={timeDelay || 0.5}
                            name="delay">
                            <option>0.5</option>
                            <option>1.0</option>
                            <option>1.5</option>
                            <option>2.0</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default GameSettings;