import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/TaskCreateEditForm.module.css";

function TaskCreateForm({ setTasks }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "", // Set the initial value to an empty string
    priority: "medium",
    is_done: false,
  });

  const history = useHistory();

  const { title, description, date, priority, is_done } = taskData;

  useEffect(() => {
    // Set the default value for the date field to "today"
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setTaskData({
      ...taskData,
      date: formattedDate,
    });
  }, []); // This effect runs once when the component mounts

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleDoneToggle = () => {
    setTaskData({
      ...taskData,
      is_done: !is_done,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/tasks/", taskData);
      setTasks((prevTasks) => ({
        ...prevTasks,
        results: [...prevTasks.results, taskData],
      }));
      history.push("/tasks"); // Redirect to the task list page
    } catch (err) {
      // Handle error
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={date}
          onChange={handleChange}
        />
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
          onChange={handleDoneToggle}
        />
      </Form.Group>

      <Button
        className={`${styles.Button} ${styles.Blue}`}
        onClick={() => {
          history.push("/tasks");
        }}
      >
        Cancel
      </Button>
      <Button className={`${styles.Button} ${styles.Blue}`} type="submit">
        Create
      </Button>
    </Form>
  );
}

export default TaskCreateForm;
