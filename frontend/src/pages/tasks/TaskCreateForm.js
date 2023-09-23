import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function TaskCreateForm({ onTaskCreated }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    priority: "medium",
    is_done: false,
  });

  const { title, description, date, priority, is_done } = taskData;
  const history = useHistory();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("priority", priority);
    formData.append("is_done", is_done);
    console.log(formData, "hello")
    try {
      const { data } = await axiosReq.post("/tasks/", formData);
      history.push("/tasks");
    } catch (err) {
      console.log(err);
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
          onChange={(e) =>
            setTaskData({ ...taskData, is_done: e.target.checked })
          }
        />
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        Create
      </Button>
    </Form>
  );
}

export default TaskCreateForm;
