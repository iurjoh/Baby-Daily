import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function TaskEditForm({ task, onEditFormClose, onUpdateTask }) {
  const [editedTask, setEditedTask] = useState(task);
  const [validationErrors, setValidationErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: newValue,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!editedTask.title.trim()) {
      errors.title = "Title cannot be empty";
    }
    if (!editedTask.description.trim()) {
      errors.description = "Description cannot be empty";
    }
    // Add additional validations for other fields if needed

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return; // If there are validation errors, do not proceed with submission
    }

    try {
      const updatedTask = await axiosRes.put(`/tasks/${editedTask.id}/`, editedTask);
      onUpdateTask(updatedTask);
      onEditFormClose();
      history.push('/tasks/');
    } catch (err) {
      console.log("wrong redirect");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {Object.keys(validationErrors).length > 0 && (
        <Alert variant="danger">
          Please fill in all required fields before submitting the form.
        </Alert>
      )}
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          isInvalid={!!validationErrors.title}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.title}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          isInvalid={!!validationErrors.description}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.description}
        </Form.Control.Feedback>
      </Form.Group>
      {/* Other form groups with similar structure for date, priority, and is_done */}
      <div className="text-center">
        <Button
          variant="secondary"
          onClick={onEditFormClose}
          style={{ marginRight: "10px" }}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </div>
    </Form>
  );
}

export default TaskEditForm;
