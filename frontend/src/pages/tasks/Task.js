import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Task = ({ task }) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{task.title}</Card.Title>
          <Card.Text>{task.description}</Card.Text>
        </Card.Body>
      </Card>
      <Button onClick={handleGoBack}>Back</Button>
    </div>
  );
};

export default Task;
