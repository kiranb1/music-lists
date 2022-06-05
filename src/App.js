import "./App.scss";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const App = () => {
  return (
    <div className="App">
      <div className="main-container text-center py-5 px-4">
        <h1 className="display-5 fw-bold">Music list generator</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Enter a genre to get the top 10 tracks for it
          </p>
          <div className="d-grid d-sm-flex justify-content-sm-center">
            <Button variant="primary" className="btn btn-primary btn-lg px-4">
              Generate
            </Button>
          </div>
        </div>
      </div>
      <div className="generated-list">
        <ListGroup as="ol" numbered>
          <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
          <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
          <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
};

export default App;
