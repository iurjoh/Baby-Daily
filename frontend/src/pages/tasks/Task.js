import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults"; // Import axiosRes from your Axios configuration or instance

const Task = ({ task }) => {
  const history = useHistory();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleGoBack = () => {
    history.goBack();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({
      ...editedTask,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      await axiosRes.put(`/tasks/${task.id}/`, editedTask); // Assuming your API endpoint is correct
      // Redirect to the task page after saving
      history.push('/tasks/');

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <Card className="mb-4">
        <Card.Body>
          {isEditing ? (
            <>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={editedTask.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={editedTask.date}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="priority">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="is_done">
                <Form.Check
                  type="checkbox"
                  name="is_done"
                  checked={editedTask.is_done}
                  onChange={handleChange}
                  label="Is Done"
                />
              </Form.Group>
              <Button onClick={handleSave}>Save</Button>
            </>
          ) : (
            <>
              <Card.Title>{task.title}</Card.Title>
              <Card.Text>{task.description}</Card.Text>
              <Card.Text>{task.date}</Card.Text>
              <Card.Text>{task.priority}</Card.Text>
              <Card.Text>{task.is_done}</Card.Text>
              <Button onClick={handleEdit}>Edit</Button>
            </>
          )}
        </Card.Body>
      </Card>
      <Button onClick={handleGoBack}>Back</Button>
    </div>
  );
};

export default Task;
