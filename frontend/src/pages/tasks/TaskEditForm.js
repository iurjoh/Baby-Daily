import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";

function TaskEditForm({ id, title: initialTitle, setShowEditForm, setTasks }) {
  const [title, setTitle] = useState(initialTitle);
  const history = useHistory();

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (title.trim() === initialTitle) {
        setShowEditForm(false);
        return;
      }

      await axiosRes.put(`/tasks/${id}/`, {
        title: title.trim(),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: title.trim() } : task
        )
      );
      setShowEditForm(false);
      history.push(`/tasks/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Control
          type="text"
          value={title}
          onChange={handleChange}
        />
      </Form.Group>
      <div className="text-center">
        <Button
          variant="secondary"
          onClick={() => setShowEditForm(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
        >
          Save
        </Button>
      </div>
    </Form>
  );
}

export default TaskEditForm;
