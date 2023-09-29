import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function TaskEditForm({ task, onEditFormClose, onUpdateTask }) {
  const [editedTask, setEditedTask] = useState(task);
  const history = useHistory();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
          type="text"
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
      <div className="text-center">
        <Button variant="secondary" onClick={onEditFormClose}>
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
