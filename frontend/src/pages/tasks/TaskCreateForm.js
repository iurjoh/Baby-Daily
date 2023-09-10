import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";

const TaskCreateForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosReq.post("/tasks/", formData); // Replace with your API endpoint
      history.push("/tasks"); // Redirect to the tasks list page after creating a task
    } catch (error) {
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    }
  };

  return (
    <div>
      <h1>Create a New Task</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <Alert variant="danger">{errors.title.join(", ")}</Alert>
          )}
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <Alert variant="danger">{errors.description.join(", ")}</Alert>
          )}
        </Form.Group>

        <Form.Group controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
          {errors.dueDate && (
            <Alert variant="danger">{errors.dueDate.join(", ")}</Alert>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Task
        </Button>
      </Form>
    </div>
  );
};

export default TaskCreateForm;
