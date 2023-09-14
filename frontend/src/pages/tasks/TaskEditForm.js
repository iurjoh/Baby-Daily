import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

function TaskEditForm(props) {
  const { id, title, setShowEditForm, setTasks } = props;

  const [formTitle, setFormTitle] = useState(title);

  const handleChange = (event) => {
    setFormTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formTitle.trim() === title) {
        setShowEditForm(false);
        return;
      }

      await axiosReq.put(`/tasks/${id}/`, {
        title: formTitle.trim(),
      });

      setTasks((prevTasks) => ({
        ...prevTasks,
        results: prevTasks.results.map((task) =>
          task.id === id
            ? {
                ...task,
                title: formTitle.trim(),
                updated_at: "now",
              }
            : task
        ),
      }));
      setShowEditForm(false);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formTitle}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          Cancel
        </button>
        <button
          className={styles.Button}
          disabled={!formTitle.trim() || formTitle.trim() === title}
          type="submit"
        >
          Save
        </button>
      </div>
    </Form>
  );
}

export default TaskEditForm;
