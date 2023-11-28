import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import taskStyles from "../../styles/TaskPage.module.css";


function TaskCreateForm({ onTaskCreated }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    priority: "medium",
    is_done: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const { title, description, date, priority, is_done } = taskData;
  const history = useHistory();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) {
      errors.title = "Title cannot be empty";
    }
    if (!description.trim()) {
      errors.description = "Description cannot be empty";
    }
    if (!date) {
      errors.date = "Date cannot be empty";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("priority", priority);
    formData.append("is_done", is_done);
    
    try {
      const { data } = await axiosReq.post("/tasks/", formData);
      history.push("/tasks");
    } catch (err) {
      console.log(err);
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
          value={title}
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
          as="textarea"
          rows={3}
          name="description"
          value={description}
          onChange={handleChange}
          isInvalid={!!validationErrors.description}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.description}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={date}
          onChange={handleChange}
          isInvalid={!!validationErrors.date}
        />
        <Form.Control.Feedback type="invalid">
          {validationErrors.date}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="priority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="mb-3" controlId="is_done">
        <Form.Check
          type="checkbox"
          label="Done"
          checked={is_done}
          onChange={(e) =>
            setTaskData({ ...taskData, is_done: e.target.checked })
          }
        />
      </Form.Group>
      <div className={`${taskStyles.Header} text-center mt-5`} style={{ marginBottom: '20px' }}>
        <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        variant="primary"
        size="lg"
        style={{ marginRight: "10px" }}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        variant="primary"
        size="lg"
        type="submit"
      >
        Create
      </Button>
      </div>
    </Form>
  );
}

export default TaskCreateForm;
